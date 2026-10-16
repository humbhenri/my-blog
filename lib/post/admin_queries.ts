import { postRepository } from "@/repositories/posts";
import { cache } from "react";

export const findPostByIdAdmin = cache(
  async (id: string) => postRepository.findById(id),
);

export const findAllPostsAdmin = cache(
  async () => postRepository.findAll()
);
