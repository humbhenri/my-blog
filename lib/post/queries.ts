import { postRepository } from "@/repositories/posts";
import { cache } from "react";

export const findAllPublicPosts = cache(
  async () => await postRepository.findAllPublished(),
);
