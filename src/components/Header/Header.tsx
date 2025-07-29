import Link from 'next/link';
import CartButtonWithPopup from '../CartButtonWithPopup';

export default function Header() {
    return (
        <header className="z-1 flex h-[80px] min-h-[80px] items-center pl-(--spacing-l) pr-(--spacing-l) justify-between bg-green-500 [box-shadow:0_6px_16px_0_rgba(0,0,0)]">
            <span>Emin&apos;s Grocery</span>
            <div className="flex gap-(--spacing-m) items-center">
                <Link href="/" className="default-text">
                    Login
                </Link>
                <CartButtonWithPopup />
            </div>
        </header>
    );
}
