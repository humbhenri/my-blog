import { Footer } from "../Footer";
import { Header } from "../Header";

export function Container({ children }: { children: React.ReactNode }) {
    return (
        <div className="px-4 sm:px-6 lg:px-8 flex flex-col">
            {children}
        </div>
    );
}