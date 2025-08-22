'use client';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const authSchema = z.object({
  email: z.email('Invalid email'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters').optional(),
});

export type AuthFormValues = z.infer<typeof authSchema>;

interface AuthFormProps {
  mode: 'login' | 'register';
  onSubmit: (data: AuthFormValues) => void;
}

export default function AuthForm({ mode, onSubmit }: AuthFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthFormValues>({
    resolver: zodResolver(authSchema),
  });

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='max-w-sm mx-auto p-8 bg-white rounded-xl shadow-lg space-y-6'
    >
      {mode === 'register' && (
        <div>
          <label
            htmlFor='name'
            className='block text-sm font-semibold text-gray-700'
          >
            Name
          </label>
          <input
            id='name'
            type='text'
            {...register('name')}
            className='mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition'
          />
          {errors.name && (
            <p className='text-sm text-red-500 mt-1'>{errors.name.message}</p>
          )}
        </div>
      )}

      <div>
        <label
          htmlFor='email'
          className='block text-sm font-semibold text-gray-700'
        >
          Email
        </label>
        <input
          id='email'
          type='email'
          {...register('email')}
          className='mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition'
        />
        {errors.email && (
          <p className='text-sm text-red-500 mt-1'>{errors.email.message}</p>
        )}
      </div>

      <div>
        <label
          htmlFor='password'
          className='block text-sm font-semibold text-gray-700'
        >
          Password
        </label>
        <input
          id='password'
          type='password'
          {...register('password')}
          className='mt-2 block w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 transition'
        />
        {errors.password && (
          <p className='text-sm text-red-500 mt-1'>{errors.password.message}</p>
        )}
      </div>

      <button
        type='submit'
        className='w-full bg-indigo-600 text-white rounded-lg py-3 font-semibold hover:bg-indigo-700 shadow-md transition'
      >
        {mode === 'login' ? 'Login' : 'Register'}
      </button>
    </form>
  );
}
