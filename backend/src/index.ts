import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { decode, sign, verify } from "hono/jwt";

const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.use("/api/v1/blog/*", async (c, next) => {
  const header = c.req.header("Authorization") || "";
  const response = await verify(header, c.env.JWT_SECRET);

  if (response.id) {
    await next();
  } else {
    return c.json({ error: "Unauthorized" }, 401);
  }
});

app.post("/api/v1/user/signup", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();
    const createdUser = await prisma.user.create({
      data: {
        email: body.email,
        name: body.name,
        password: body.password,
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

  const body = await c.req.json();

  const user = await prisma.user.findUnique({ where: { email: body.email } });

  !user && c.json({ Error: "User not found" }, 404);

  const isValid = user?.password === body.password;

  !isValid && c.json({ Error: "Invalid password" }, 401);

  const token = await sign(
    {
      id: user?.id,
      email: user?.email,
      name: user?.name,
    },
    c.env.JWT_SECRET
  );

  return c.json({ jwt: token }, 200);
});

app.post("/api/v1/blog", (c) => {
  return c.text("Post blog route");
});

app.put("/api/v1/blog", (c) => {
  return c.text("Update blog route");
});

app.get("/api/v1/blog/:id", (c) => {
  const id = c.req.param("id");
  console.log(id);
  return c.text("Get a single blog route");
});

app.get("/api/v1/blog/bulk", (c) => {
  return c.text("Get all blogs route");
});

export default app;
