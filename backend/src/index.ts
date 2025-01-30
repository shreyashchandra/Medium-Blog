import { Hono } from "hono";
import { userRouter } from "./routes/user.routes";
import { blogRouter } from "./routes/blog.routes";
import { authMiddleware } from "./middlewares/authMiddleware.middleware";
import { cors } from "hono/cors";

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

app.use("/*", cors());

// Routes
app.get("/", (c) => c.text("Hello Hono!"));
app.route("/api/v1/user", userRouter);
// app.use("/api/v1/blog/*", authMiddleware);
app.route("/api/v1/blog", blogRouter);

export default app;
