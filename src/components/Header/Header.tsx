import Link from 'next/link';

export default function Header() {
    return (
        <header className="flex h-[80px] items-center pl-(--spacing-l) pr-(--spacing-l) justify-between bg-green-500 [box-shadow:0_6px_16px_0_rgba(0,0,0)]">
            <span>Emin&apos;s Grocery</span>
            <div>
                <Link href="/" className="default-text">
                    Login
                </Link>
            </div>
        </header>
    );
}
