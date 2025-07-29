'use client';

import { useState } from 'react';
import { useCartStore } from '@/store/useCartStore';

type Props = {
    productId: string;
    pricePerKgs: {
        amount: number;
        currency: string;
    };
};

export default function AmountSpinner({ productId, pricePerKgs }: Props) {
    const storeAmount = useCartStore((s) => s.getAmount(productId));
    const addToCart = useCartStore((s) => s.addToCart);
    const [input, setInput] = useState(storeAmount?.amount ?? 1);

    const handleChange = (val: number) => setInput(Math.max(1, val));

    return (
        <div className="flex flex-col gap-2 w-[170px]">
            <div>
                <div className="flex items-center gap-2">
                    <button
                        aria-label="Decrease amount"
                        className="card cursor-pointer flex items-center justify-center p-(--spacing-s) rounded bg-gray-500 hover:bg-hover-gray-500 default-text font-bold w-[30px] h-[30px]"
                        onClick={(e) => {
                            e.preventDefault();
                            handleChange(input - 1);
                        }}
                        disabled={input <= 1}
                        type="button"
                    >
                        −
                    </button>
                    <input
                        type="number"
                        min={1}
                        step={1}
                        value={input}
                        aria-label="Amount"
                        className="card w-[40px] text-center"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            handleChange(Number.isNaN(val) ? 1 : val);
                        }}
                    />
                    <button
                        aria-label="Increase amount"
                        className="card cursor-pointer flex items-center justify-center p-(--spacing-s) rounded bg-gray-500 hover:bg-hover-gray-500 default-text font-bold w-[30px] h-[30px]"
                        onClick={(e) => {
                            e.preventDefault();
                            handleChange(input + 1);
                        }}
                        type="button"
                    >
                        +
                    </button>
                    <label className="small-text font-bold">Kg(s)</label>
                </div>
            </div>
            <button
                className="card bg-green-500 hover:bg-hover-green py-(--spacing-s) rounded font-semibold cursor-pointer default-text"
                onClick={(e) => {
                    e.preventDefault();
                    addToCart(productId, input, pricePerKgs);
                }}
                type="button"
            >
                Add to cart
            </button>
        </div>
    );
}
