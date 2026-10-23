export function Footer() {
    return (
        <footer className="text-slate-900 py-4 mt-8">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-center text-sm">
                    &copy; {new Date().getFullYear()} My Blog. All rights reserved.
                </p>
            </div>
        </footer>
    );
}