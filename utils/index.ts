import { ZodFormattedError } from 'zod/v3';

export async function asyncDelay(milli: number = 0, verbose = false) {
  if (milli <= 0) return;
  if (verbose) {
    console.log(`Delaying for ${milli / 1000} seconds.`);
  }
  await new Promise((resolve) => setTimeout(resolve, milli));
}

export function getZodErrorMessages<T>(error: ZodFormattedError<T>): string[] {
  return Object.values(error)
    .map((field) => {
      if (Array.isArray(field)) return field;
      return field?._errors || [];
    })
    .flat()
    .filter(Boolean);
}

export function slugify(text: string): string {
  return text.trim().toLowerCase().replace(/\s+/g, '-') + '-' + crypto.randomUUID().slice(0, 8);
}
