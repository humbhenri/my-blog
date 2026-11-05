import { LoginForm } from '@/components/Admin/LoginForm';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  return (
    <div className="flex items-center justify-center text-center max-w-sm mt-10 mb-32 mx-auto">
      <LoginForm />
    </div>
  );
}
