// app/products/ProductListClient.tsx
'use client';

import { useEffect, useRef, useState } from 'react';
import ProductItem from '../../ProductItem';
import { Product } from '@/types/Product';
import { useProductDataStore } from '@/store/useProductDataStore';

export default function ProductListClient() {
    const [products, setProducts] = useState<Product[]>([]);
    const observerRef = useRef(null);
    const allDataFetched = useProductDataStore((state) => state.allDataFetched);
    const setAllDataFetched = useProductDataStore(
        (state) => state.setAllDataFetched
    );

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    fetchNextPage();
                }
            },
            { threshold: 1 }
        );
        if (observerRef.current) observer.observe(observerRef.current);
        return () => observer.disconnect();
    }, []);

    const fetchNextPage = async () => {
        const res = await fetch(
            'https://eminakkoc.github.io/ecommerce/mock-api/products-2.json'
        );
        const nextPage = await res.json();
        setProducts((prev) => [...prev, ...nextPage]);
        setAllDataFetched(true);
    };

    return (
        <>
            <div className="grid grid-cols-[300px_300px_300px] gap-(--spacing-m) m-auto">
                {products.map((p) => (
                    <ProductItem key={p.id} product={p} />
                ))}
            </div>
            {!allDataFetched && <div ref={observerRef} className="h-4" />}
        </>
    );
}
