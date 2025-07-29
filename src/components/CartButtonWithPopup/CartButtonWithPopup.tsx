'use client';

import useOnClickOutside from '@/hooks/useOnClickOutside';
import { useCartStore } from '@/store/useCartStore';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { BASE_URL } from '@/constants/fetch';

export default function CartButtonWithPopup() {
    const [open, setOpen] = useState(false);
    const btnRef = useRef<HTMLButtonElement>(null);
    const popupRef = useRef<HTMLDivElement>(null);
    const items = useCartStore((state) => state.items);

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
                className="relative p-(--spacing-s) card bg-orange-500 hover:bg-hover-orange small-text font-semibold"
                aria-haspopup="true"
                aria-expanded={open}
                aria-controls="cart-popup"
            >
                Cart
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
                            <div className="flex flex-col gap-(--spacing-s)">
                                {items.map((item) => (
                                    <div
                                        key={item.product.id}
                                        className="grid grid-cols-[32px_86px_60px_76px] gap-(--spacing-s) items-center justify-between"
                                    >
                                        <Image
                                            unoptimized
                                            src={`${BASE_URL}${item.product.imageData}`}
                                            className="pixelate"
                                            width={32}
                                            height={32}
                                            alt={`${item.product.name} image`}
                                        />
                                        <span
                                            className="small-text"
                                            title={item.product.name}
                                        >
                                            {item.product.name}
                                        </span>
                                        <span className="small-text">
                                            {item.amount} Kg(s)
                                        </span>
                                        <span className="font-bold text-right small-text">
                                            {item.amount *
                                                item.product.pricePerKgs
                                                    .amount}{' '}
                                            {item.product.pricePerKgs.currency}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            className="card bg-green-500 hover:bg-hover-green disabled:bg-green-500 disabled:opacity-[0.4] py-(--spacing-s) rounded font-semibold cursor-pointer default-text mt-(--spacing-m)"
                            disabled={items.length === 0}
                            onClick={(e) => {
                                e.preventDefault();
                                console.log('Proceed');
                            }}
                            type="button"
                        >
                            Proceed to checkout
                        </button>
                    </div>,
                    document.body
                )}
        </div>
    );
}
