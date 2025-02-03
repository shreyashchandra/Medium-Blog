import z from "zod";

export const signUpInput = z.object({
  email: z.string().email(),
  name: z.string().optional(),
  password: z.string().min(6),
  bio: z.string().optional(),
});

export const signInInput = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export const userUpdateInput = z.object({
  name: z.string().optional(),
  bio: z.string().optional(),
});

export const createPostInput = z.object({
  title: z.string(),
  content: z.string(),
  imageUrl: z.string().optional(),
});

export const updatePostInput = z.object({
  id: z.string(),
  title: z.string().optional(),
  content: z.string().optional(),
  published: z.boolean().optional(),
});

export type SignUpInput = z.infer<typeof signUpInput>;
export type SignInInput = z.infer<typeof signInInput>;
export type UserUpdateInput = z.infer<typeof userUpdateInput>;
export type CreatePostInput = z.infer<typeof createPostInput>;
export type UpdatePostInput = z.infer<typeof updatePostInput>;
