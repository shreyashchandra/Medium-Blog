import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import {
  createPostInput,
  updatePostInput,
} from "@shreyashchandra/medium-blog-common";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

blogRouter.post("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = createPostInput.safeParse(body);
    if (!success) {
      return c.json({ error: "Invalid input" }, 400);
    }

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

blogRouter.put("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const body = await c.req.json();
    const { success } = updatePostInput.safeParse(body);
    if (!success) {
      return c.json({ error: "Invalid input" }, 400);
    }

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
        published: body.published,
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

blogRouter.get("/", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const id = c.req.query("id");
    console.log("id", id);

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

// TODO: Add pagination
blogRouter.get("/bulk", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.req.user?.id;
    console.log("userId", userId);

    const findBlog = await prisma.post.findMany({
      where: {
        authorId: userId,
      },
    });

    if (!findBlog) {
      return c.json({ error: "Blogs not found" }, 404);
    }

    return c.json(findBlog, 201);
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ error: "Failed to get blogs" }, 500);
  }
});

// TODO: Add pagination
blogRouter.get("/all", async (c) => {
  try {
    const prisma = new PrismaClient({
      datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const findBlog = await prisma.post.findMany({
      where: { published: true },
      select: {
        id: true,
        title: true,
        content: true,
        published: true,
        author: {
          select: {
            name: true,
            bio: true,
          },
        },
        createdAt: true,
      },
    });

    if (!findBlog) {
      return c.json({ error: "Blogs not found" }, 404);
    }

    return c.json(findBlog, 201);
  } catch (error) {
    console.error("Error creating blog:", error);
    return c.json({ error: "Failed to get blogs" }, 500);
  }
});
