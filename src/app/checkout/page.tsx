'use client';

import CartItem from '@/components/CartItem';
import InfoModal from '@/components/InfoModal';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function CheckoutPage() {
    const [openSuccessModal, setOpenSuccessModal] = useState<boolean>(false);
    const [openZeroAmountModal, setOpenZeroAmountModal] =
        useState<boolean>(false);

    const items = useCartStore((state) => state.items);
    const total = useCartStore((state) => state.getTotalAmount());
    const addToCart = useCartStore((s) => s.addToCart);
    const removeFromCart = useCartStore((s) => s.removeFromCart);
    const emptyCart = useCartStore((s) => s.emptyCart);

    const router = useRouter();

    return items.length > 0 ? (
        <div className="flex flex-col w-[400px] max-md:w-[300px] card m-auto p-(--spacing-m) max-md:p-(--spacing-s)">
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
            <>
                <div className="flex justify-between items-center mt-(--spacing-s) py-(--spacing-s)">
                    <span className="small-text font-bold">Total:</span>
                    <span className="small-text font-bold text-pink-500">
                        {total.toFixed(2)}{' '}
                        {items[0]?.product.pricePerKgs.currency}
                    </span>
                </div>
                <button
                    className="mt-(--spacing-m) card text-center bg-green-500 hover:bg-hover-green disabled:bg-green-500 disabled:opacity-[0.4] py-(--spacing-s) rounded font-semibold cursor-pointer default-text"
                    onClick={() => {
                        if (!total) {
                            setOpenZeroAmountModal(true);
                        } else {
                            setOpenSuccessModal(true);
                        }
                    }}
                >
                    Pay
                </button>
            </>
            <InfoModal
                open={openSuccessModal}
                onClose={() => {
                    router.push('/');
                    emptyCart();
                }}
                message={'Payment Success!'}
                buttonLabel={'Done'}
            />
            <InfoModal
                open={openZeroAmountModal}
                onClose={() => {
                    setOpenZeroAmountModal(false);
                }}
                message={'Sorry, there is no amount to pay.'}
                buttonLabel={'Done'}
            />
        </div>
    ) : null;
}
