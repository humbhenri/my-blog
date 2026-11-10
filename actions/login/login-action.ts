'use server';

import { createLoginSession, verifyPassword } from '@/lib/login/manage-login';
import { redirect } from 'next/navigation';

type LoginActionState = {
  username: string;
  error: string;
};

export async function loginAction(
  state: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  const allowLogin = Boolean(Number(process.env.ALLOW_LOGIN));
  if (!allowLogin) {
    return {
      username: '',
      error: 'Login proibido',
    };
  }

  if (!(formData instanceof FormData)) {
    return {
      username: '',
      error: 'Dados inválidos',
    };
  }

  const username = formData.get('username')?.toString() || '';
  const password = formData.get('password')?.toString() || '';
  const isValidPass = await verifyPassword(password, process.env.LOGIN_PASS!);
  if (!username.length || !password.length) {
    return {
      username: '',
      error: 'Usuário e senha são obrigatórios',
    };
  }
  if (username != process.env.LOGIN_USER || !isValidPass) {
    return {
      username: '',
      error: 'Usuário ou senha inválidos',
    };
  }

  await createLoginSession(username);
  redirect('/admin/post');
}
