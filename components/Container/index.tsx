import { Footer } from "../Footer";
import { Header } from "../Header";

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 min-h-screen">
            {children}
        </div>
    );
}