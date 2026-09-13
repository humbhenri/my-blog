import Link from "next/link";

type HeadingProps = {
    children: React.ReactNode;
    url: string;
    as?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
};

const headingClasses = {
    h1: "text-4xl font-extrabold sm:py-10 md:py-10 py-8",
    h2: "text-3xl font-bold sm:py-8 md:py-8 py-6",
    h3: "text-2xl font-semibold sm:py-6 md:py-6 py-4",
    h4: "text-xl font-medium sm:py-4 md:py-4 py-2",
    h5: "text-lg font-medium sm:py-2 md:py-2 py-1",
    h6: "text-base font-medium sm:py-1 md:py-1 py-0.5",
};

export function Heading({ children, url, as: HeadingTag = "h2" }: HeadingProps) {

    return (
        <HeadingTag className={headingClasses[HeadingTag]}>
            <Link href={url}>
                {children}
            </Link>
        </HeadingTag>
    )
}