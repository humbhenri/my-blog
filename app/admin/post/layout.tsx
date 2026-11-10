import { Menu } from '@/components/Admin/Menu';
import { requireLoggedOrRedirect } from '@/lib/login/manage-login';

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  await requireLoggedOrRedirect();
  return (
    <div>
      <Menu />
      {children}
    </div>
  );
}
