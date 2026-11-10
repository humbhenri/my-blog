import { LoginForm } from '@/components/Admin/LoginForm';
import ErrorMessage from '@/components/ErrorMessage';

export const dynamic = 'force-dynamic';

export default async function AdminLoginPage() {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return (
      <ErrorMessage
        pageTitle="Forbidden"
        contentTitle="Login proibido"
        content="Não é possível efetuar o login"
      />
    );
  }

  return (
    <div className="flex items-center justify-center text-center max-w-sm mt-10 mb-32 mx-auto">
      <LoginForm />
    </div>
  );
}
