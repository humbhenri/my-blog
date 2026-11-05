'use client';

import { loginAction } from '@/actions/login/login-action';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { LogInIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'react-toastify';

export function LoginForm() {
  const initialState = {
    username: '',
    error: '',
  };
  const [state, action, isPending] = useActionState(loginAction, initialState);

  useEffect(() => {
    if (state.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form action={action} className="flex-1 flex flex-col gap-6">
      <Input
        type="text"
        name="username"
        labelText="Usuário"
        placeholder="Seu usuário"
        disabled={false}
      />
      <Input
        type="password"
        name="password"
        labelText="Senha"
        placeholder="Sua senha"
        disabled={false}
      />
      <Button disabled={false} type="submit" className="mt-4" size="md">
        <LogInIcon />
        Entrar
      </Button>
      {!!state.error && <p className="text-red-600">{state.error}</p>}
    </form>
  );
}
