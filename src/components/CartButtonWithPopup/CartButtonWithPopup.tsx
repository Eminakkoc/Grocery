'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import CartItem from '../CartItem';
import Image from 'next/image';
import CartImage from '@/assets/shopping_cart.png';

export default function CartButtonWithPopup() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const items = useCartStore((state) => state.items);
    const total = useCartStore((state) => state.getTotalAmount());
    const addToCart = useCartStore((s) => s.addToCart);
    const removeFromCart = useCartStore((s) => s.removeFromCart);

    useOnClickOutside(popupRef, () => setOpen(false));

    useEffect(() => {
        if (open && popupRef.current) {
            popupRef.current.focus();
        }
    }, [open]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => setMounted(true), []);

    return (
        <div className="relative">
            <button
                ref={btnRef}
                onClick={() => setOpen((v) => !v)}
                className="relative button bg-orange-500 hover:bg-hover-orange p-(--spacing-xs)"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls="cart-popup"
            >
                <Image
                    unoptimized
                    src={CartImage}
                    className="pixelate"
                    width={32}
                    height={32}
                    alt="Filter sort image"
                />
            </button>

            {mounted &&
                open &&
                createPortal(
                    <div
                        ref={popupRef}
                        tabIndex={-1}
                        id="cart-popup"
                        role="dialog"
                        aria-modal="true"
                        className="flex flex-col gap-(--spacing-s) z-50 w-80 bg-background shadow-xl card p-(--spacing-m) absolute top-[70px] right-(--spacing-l)"
                    >
                        <span className="font-bold default-text mb-(--spacing-s)">
                            Your Cart
                        </span>
                        {items.length === 0 ? (
                            <div className="small-text">Cart is empty.</div>
                        ) : (
                            <div className="flex flex-col gap-(--spacing-s) max-h-[380px] overflow-auto">
                                {items.map((item) => (
                                    <CartItem
                                        key={item.product.id}
                                        item={item}
                                        addToCart={addToCart}
                                        removeFromCart={removeFromCart}
                                    />
                                ))}
                            </div>
                        )}

                        {items.length > 0 && (
                            <>
                                <div className="flex justify-between items-center mt-(--spacing-s) py-(--spacing-s)">
                                    <span className="small-text font-bold">
                                        Total:
                                    </span>
                                    <span className="small-text font-bold text-pink-500">
                                        {total.toFixed(2)}{' '}
                                        {items[0]?.product.pricePerKgs.currency}
                                    </span>
                                </div>
                                <Link
                                    className="text-center button bg-green-500 hover:bg-hover-green disabled:bg-green-500 disabled:opacity-[0.4] default-text"
                                    href="/checkout"
                                    onClick={() => {
                                        setOpen(false);
                                    }}
                                >
                                    Proceed to checkout
                                </Link>
                            </>
                        )}
                    </div>,
                    document.body
                )}
        </div>
    );
}
