import Image from "next/image";
import Link from "next/link";

type CoverImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  href: string;
};

export function CoverImage({ src, alt, width = 800, height = 400, href }: CoverImageProps) {
  return (
    <Link className="w-full h-full overflow-hidden rounded-xl hover:scale-105 transition-transform duration-200 cursor-pointer group" href={href}>
      <Image
        className="w-full rounded-xl h-full object-cover object-center group-hover:scale-105 transition-transform duration-200"
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority
      />
    </Link>
  );
}
