import { Hono, MiddlewareHandler } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";
import bcrypt from "bcryptjs";

type User = {
  id: string;
  name: string;
  email: string;
};

declare module "hono" {
  interface HonoRequest {
    user?: User;
  }
}

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

// Middleware for authentication
const authMiddleware: MiddlewareHandler = async (c, next) => {
  const token = c.req.header("Authorization") || "";
  try {
    const user = await verify(token, c.env.JWT_SECRET);
    if (user.id) {
      c.req.user = user as User;
      await next();
    } else {
      return c.json({ error: "Unauthorized" }, 401);
    }
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
};

// Routes
app.get("/", (c) => c.text("Hello Hono!"));

// Apply authentication middleware to all blog routes
app.use("/api/v1/blog/*", authMiddleware);

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
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

app.post("/api/v1/user/signin", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
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

app.put("/api/v1/user/update", authMiddleware, async (c) => {
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

app.post("/api/v1/blog", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    // Extract user id from the token
    const userId = c.req.user?.id;

    const createdPost = await prisma.post.create({
      data: {
        title: body.title,
        content: body.content,
        author: {
          connect: { id: userId },
        },
      },
    });

    if (!createdPost) {
      return c.json({ error: "Failed to create blog" }, 500);
    }

    return c.json(createdPost, 201);
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ error: "Failed to create blog" }, 500);
  }
});

app.put("/api/v1/blog", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();

    const findBlog = await prisma.post.findUnique({
      where: {
        id: body.id,
      },
    });

    if (!findBlog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    const updateBlog = await prisma.post.update({
      where: { id: body.id },
      data: {
        title: body.title,
        content: body.content,
        published: body.published || true,
      },
    });

    if (!updateBlog) {
      return c.json({ error: "Failed to update blog" }, 500);
    }

    return c.json(updateBlog, 201);
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ error: "Failed to update blog" }, 500);
  }
});

app.get("/api/v1/blog/:id", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.param("id");

    const findBlog = await prisma.post.findUnique({
      where: {
        id: id,
      },
    });

    if (!findBlog) {
      return c.json({ error: "Blog not found" }, 404);
    }

    return c.json(findBlog, 201);
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ error: "Failed to get blog" }, 500);
  }
});

app.get("/api/v1/blog/bulk", (c) => c.text("Get all blogs route"));

export default app;
