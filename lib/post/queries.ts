import { postRepository } from "@/repositories/posts";
import { cache } from "react";

export const findAllPublicPostsCached = cache(
  async () => await postRepository.findAllPublished(),
);

export const findPostBySlugCached = cache(
  async (slug: string) => await postRepository.findBySlug(slug),
);
