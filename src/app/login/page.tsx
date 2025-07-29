'use client';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const redirectTo = searchParams.get('redirectTo') ?? '/';

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');
        const form = e.target as HTMLFormElement;
        const username = (
            form.elements.namedItem('username') as HTMLInputElement
        ).value;
        const password = (
            form.elements.namedItem('password') as HTMLInputElement
        ).value;

        const res = await fetch('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (res.ok) {
            router.replace(redirectTo);
        } else {
            setError('Login failed!');
            setIsSubmitting(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center">
            <form
                onSubmit={handleLogin}
                className="card flex flex-col gap-(--spacing-m) w-full max-w-[300px] p-6 rounded-xl shadow-md"
                aria-label="Login form"
            >
                <h1 className="text-center">Login</h1>
                <div className="flex flex-col gap-1">
                    <label htmlFor="username" className="small-text font-bold">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        autoComplete="username"
                        required
                        className="h-[50px] px-(--spacing-m) card focus:outline-none"
                        aria-required="true"
                        aria-label="Username"
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label htmlFor="password" className="small-text font-bold">
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="h-[50px] px-(--spacing-m) card focus:outline-none"
                        aria-required="true"
                        aria-label="Password"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="h-[50px] mt-(--spacing-s) w-full bg-green-500 hover:bg-hover-green default-text font-bold card focus:outline-none"
                    aria-disabled={isSubmitting}
                >
                    {isSubmitting ? 'Logging in…' : 'Log in'}
                </button>

                {error && (
                    <p className="text-pink-500 text-center mt-2" role="alert">
                        {error}
                    </p>
                )}
            </form>
        </main>
    );
}
