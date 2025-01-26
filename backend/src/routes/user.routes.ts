import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import { authMiddleware } from "../middlewares/authMiddleware.middleware";
import bcrypt from "bcryptjs";
import {
  signInInput,
  signUpInput,
  userUpdateInput,
} from "@shreyashchandra/medium-blog-common";

export const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signUpInput.safeParse(body);

    if (!success) {
      return c.json({ error: "Invalid input" }, 411);
    }
    const hashedPassword = await bcrypt.hash(body.password, 10); // Hash the password
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: hashedPassword,
        bio: body.bio,
      },
    });
    const token = await sign(
      { id: createdUser.id, email: createdUser.email, name: createdUser.name },
      c.env.JWT_SECRET
    );

    return c.json({ jwt: token }, 200);
  } catch (error) {
    console.error("Error creating user:", error);
    return c.json({ error: "Failed to create user" }, 500);
  }
});

userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const { success } = signInInput.safeParse(body);
    if (!success) {
      return c.json({ error: "Invalid input" }, 411);
    }
    const user = await prisma.user.findUnique({ where: { email: body.email } });

    if (!user) return c.json({ error: "User not found" }, 404);

    const isValid = await bcrypt.compare(body.password, user.password); // Compare hashed passwords
    if (!isValid) return c.json({ error: "Invalid password" }, 401);

    const token = await sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
      },
      c.env.JWT_SECRET
    );

    return c.json({ jwt: token }, 200);
  } catch (error) {
    console.error("Error signing in:", error);
    return c.json({ error: "Failed to sign in" }, 500);
  }
});

userRouter.put("/update", authMiddleware, async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    // Extract user email from the token
    const userEmail = c.req.user?.email;

    if (!userEmail) {
      return c.json({ error: "Unauthorized - email not found in token" }, 401);
    }

    const body = await c.req.json();
    const { success } = userUpdateInput.safeParse(body);
    if (!success) {
      return c.json({ error: "Invalid input" }, 411);
    }

    // Find the user using the email from the token
    const user = await prisma.user.findUnique({ where: { email: userEmail } });

    if (!user) {
      return c.json({ error: "User not found" }, 404);
    }

    // Update the user's details
    const updatedUser = await prisma.user.update({
      where: { email: userEmail },
      data: {
        name: body.name,
        bio: body.bio,
      },
    });

    return c.json(updatedUser, 200);
  } catch (error) {
    console.error("Error updating user:", error);
    return c.json({ error: "Failed to update user" }, 500);
  }
});
