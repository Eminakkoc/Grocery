'use client';

import LoginForm from '@/components/LoginForm';
import LoginErrorBoundary from '@/error/LoginErrorBoundary';

export default function LoginPage() {
    return (
        <LoginErrorBoundary>
            <LoginForm />
        </LoginErrorBoundary>
    );
}
