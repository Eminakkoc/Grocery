'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import CartButtonWithPopup from '../CartButtonWithPopup';
import { USERNAME } from '@/constants/login';
import { CHECKOUT_ROUTE, PROTECTED_ROUTES } from '@/constants/routes';
import ThemeSwitcher from '../ThemeSwitcher';

interface Props {
    initialLoggedIn?: boolean;
}
export default function Header({ initialLoggedIn }: Props) {
    const [loggedIn, setLoggedIn] = useState(!!initialLoggedIn);
    const pathname = usePathname();
    const router = useRouter();

    useEffect(() => {
        // Refetch on route change
        fetch('/api/auth')
            .then((res) => res.json())
            .then((data) => setLoggedIn(data.loggedIn));
    }, [pathname]);

    function logout() {
        fetch('/api/logout', {
            method: 'POST',
            body: '',
            headers: { 'Content-Type': 'application/json' },
        })
            .then((res) => res.json())
            .then(() => {
                setLoggedIn(false);
                if (PROTECTED_ROUTES.includes(pathname)) {
                    router.push('/');
                }
            });
    }

    return (
        <header className="z-1 flex h-[80px] min-h-[80px] items-center pl-(--spacing-l) max-md:pl-(--spacing-m) pr-(--spacing-l) max-md:pr-(--spacing-m) justify-between bg-green-500 [box-shadow:0_6px_16px_0_rgba(0,0,0)]">
            <span>Emin&apos;s Grocery</span>
            <div className="flex gap-(--spacing-m) max-md:gap-(--spacing-s) items-center">
                <ThemeSwitcher />
                {loggedIn && (
                    <span className="small-text font-semibold">{USERNAME}</span>
                )}
                {loggedIn ? (
                    <button
                        onClick={logout}
                        className="button bg-blue-500 hover:bg-hover-blue"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="button bg-blue-500 hover:bg-hover-blue"
                    >
                        Login
                    </Link>
                )}
                {pathname !== CHECKOUT_ROUTE && <CartButtonWithPopup />}
            </div>
        </header>
    );
}
