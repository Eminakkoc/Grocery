'useClient';
import { BASE_URL } from '@/constants/fetch';
import { CartItem as Item } from '@/types/Cart';
import { Product } from '@/types/Product';
import Image from 'next/image';

interface Props {
    item: Item;
    addToCart: (product: Product, amount: number) => void;
    removeFromCart: (productId: string) => void;
}

export default function CartItem({ item, addToCart, removeFromCart }: Props) {
    return (
        <div
            key={item.product.id}
            className="flex justify-between gap-(--spacing-s) items-center border-b-1  py-(--spacing-s)"
        >
            <div className="flex flex-col gap-(--spacing-xs)">
                <div className="flex items-center gap-(--spacing-xs)">
                    <Image
                        unoptimized
                        src={`${BASE_URL}${item.product.imageData}`}
                        className="pixelate"
                        width={32}
                        height={32}
                        alt={`${item.product.name} image`}
                    />
                    <span className="small-text" title={item.product.name}>
                        {item.product.name}
                    </span>
                </div>
                <div className="flex items-center gap-(--spacing-xs)">
                    <button
                        aria-label="Decrease amount"
                        className="card cursor-pointer flex items-center justify-center p-(--spacing-s) rounded bg-gray-500 hover:bg-hover-gray-500 default-text font-bold w-[30px] h-[30px]"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(item.product, item.amount - 1);
                        }}
                        disabled={item.amount < 1}
                        type="button"
                    >
                        −
                    </button>
                    <input
                        type="number"
                        min={1}
                        step={1}
                        value={item.amount}
                        aria-label="Amount"
                        className="card w-[40px] text-center"
                        onClick={(e) => {
                            e.preventDefault();
                        }}
                        onChange={(e) => {
                            const val = parseInt(e.target.value, 10);
                            addToCart(item.product, val);
                        }}
                    />
                    <button
                        aria-label="Increase amount"
                        className="card cursor-pointer flex items-center justify-center p-(--spacing-s) rounded bg-gray-500 hover:bg-hover-gray-500 default-text font-bold w-[30px] h-[30px]"
                        onClick={(e) => {
                            e.preventDefault();
                            addToCart(item.product, item.amount + 1);
                        }}
                        disabled={item.amount < 1}
                        type="button"
                    >
                        +
                    </button>
                    <label className="small-text font-bold">Kg(s)</label>
                </div>
            </div>
            <div className="flex flex-col  gap-(--spacing-s)">
                <span className="font-bold text-right small-text">
                    {(item.amount * item.product.pricePerKgs.amount).toFixed(2)}{' '}
                    {item.product.pricePerKgs.currency}
                </span>
                <button
                    aria-label="Remove item"
                    className="cursor-pointer text-pink-500 tiny-text underline"
                    onClick={(e) => {
                        e.preventDefault();
                        removeFromCart(item.product.id);
                    }}
                    disabled={item.amount < 1}
                    type="button"
                >
                    Remove
                </button>
            </div>
        </div>
    );
}
