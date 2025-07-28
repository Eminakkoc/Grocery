import { create } from 'zustand';

type ProductDataState = {
    allDataFetched: boolean;
    setAllDataFetched: (value: boolean) => void;
};

export const useProductDataStore = create<ProductDataState>((set) => ({
    allDataFetched: false,
    setAllDataFetched: (value) => set({ allDataFetched: value }),
}));
