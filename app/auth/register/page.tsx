'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AuthForm, { AuthFormValues } from '@/app/components/AuthForm';
import { initAuth, useAuthStore } from '@/app/lib/store';
import { registerUser } from '@/app/lib/auth';

export default function RegisterPage() {
  const router = useRouter();
  const { login, initialized } = useAuthStore();

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!initialized) initAuth();
  }, [initialized]);

  const handleRegister = async (data: AuthFormValues) => {
    setLoading(true);
    setError(null);

    try {
      const response = await registerUser({
        email: data.email,
        password: data.password,
        name: data.name,
      });
      login(response.access_token);
      router.push('/recipes');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  if (!initialized) return null;

  return (
    <div className='relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 p-6'>
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-72 h-72 bg-indigo-100 rounded-full opacity-30 blur-3xl -z-10'></div>

      <div className='w-full max-w-sm'>
        <h2 className='text-3xl font-bold text-indigo-600 text-center mb-6'>
          Create your account
        </h2>

        <AuthForm mode='register' onSubmit={handleRegister} />

        {error && <p className='text-red-500 mt-3 text-center'>{error}</p>}
        {loading && (
          <p className='text-gray-500 mt-2 text-center'>Registering...</p>
        )}

        <button
          onClick={() => router.push('/')}
          className='mt-6 w-full text-indigo-600 border border-indigo-300 rounded-md py-2 hover:bg-indigo-50 transition'
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
}
