import { Hono, MiddlewareHandler } from "hono";
import { decode, sign, verify } from "hono/jwt";

type User = {
  id: string;
  name: string;
  email: string;
};

export const authMiddleware: MiddlewareHandler = async (c, next) => {
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
