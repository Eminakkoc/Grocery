'use client';

import { useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import Link from 'next/link';
import CartButtonWithPopup from '../CartButtonWithPopup';
import { USERNAME } from '@/constants/login';
import { CHECKOUT_ROUTE, PROTECTED_ROUTES } from '@/constants/routes';
import ThemeSwitcher from '../ThemeSwitcher';
import Image from 'next/image';
import EminsImage from '@/assets/emins.png';

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
            <Link className="relative top-[4px]" href="/">
                <Image
                    unoptimized
                    className="pixelate max-md:w-[100px]"
                    src={EminsImage}
                    width={150}
                    height={75}
                    alt="Filter sort image"
                />
            </Link>
            <div className="flex gap-(--spacing-m) max-md:gap-(--spacing-s) items-center">
                <ThemeSwitcher />
                {loggedIn && (
                    <span className="small-text font-semibold">{USERNAME}</span>
                )}
                {loggedIn ? (
                    <button
                        onClick={logout}
                        className="button bg-blue-500 hover:bg-hover-blue max-md:h-[46px]"
                    >
                        Logout
                    </button>
                ) : (
                    <Link
                        href="/login"
                        className="button bg-blue-500 hover:bg-hover-blue max-md:h-[46px]"
                    >
                        Login
                    </Link>
                )}
                {pathname !== CHECKOUT_ROUTE && <CartButtonWithPopup />}
            </div>
        </header>
    );
}
