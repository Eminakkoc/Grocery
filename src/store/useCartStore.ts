import { Product } from '@/types/Product';
import { create } from 'zustand';

type CartItem = {
    product: Product;
    amount: number;
};
type CartState = {
    items: CartItem[];
    setAmount: (product: Product, amount: number) => void;
    getAmount: (productId: string) => CartItem | undefined;
    addToCart: (product: Product, amount: number) => void;
};

export const useCartStore = create<CartState>((set, get) => ({
    items: [],
    setAmount: (product, amount) =>
        set((state) => {
            const items = state.items.some((i) => i.product.id === product.id)
                ? state.items.map((i) =>
                      i.product.id === product.id ? { ...i, amount } : i
                  )
                : [...state.items, { product, amount }];
            return { items };
        }),
    getAmount: (productId) =>
        get().items.find((i) => i.product.id === productId),
    addToCart: (product, amount) => {
        get().setAmount(product, amount);
    },
}));
