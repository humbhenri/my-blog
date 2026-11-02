import z from 'zod';
import sanitizeHtml from 'sanitize-html';

export const isRelativePathRegex = /^(?:\.\.?(?:\/|$)|\/)/;

export const isUrlOrRelativePath = (path: string): boolean => {
  try {
    new URL(path);
    return true;
  } catch {
    return isRelativePathRegex.test(path);
  }
};

const PostBaseSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, { message: 'Title is required' })
    .max(120, { message: 'Title must be less than 120 characters' }),
  author: z
    .string()
    .trim()
    .min(2, { message: 'Author is required' })
    .max(100, { message: 'Author must be less than 100 characters' }),
  content: z
    .string()
    .trim()
    .min(3, { message: 'Content is required' })
    .transform((val) => sanitizeHtml(val)),
  cover: z
    .string()
    .trim()
    .refine((val) => isUrlOrRelativePath(val), {
      message: 'Cover must be a valid URL or relative path',
    }),
  published: z
    .union([
      z.literal('on'),
      z.literal('true'),
      z.literal('false'),
      z.literal(true),
      z.literal(false),
      z.literal(null),
      z.literal(undefined),
    ])
    .default(false)
    .transform((val) => val === 'on' || val === 'true' || val === true),
});

export const PostCreateSchema = PostBaseSchema;

export const PostUpdateSchema = PostBaseSchema;