import { Menu } from "@/components/Admin/Menu";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
}
