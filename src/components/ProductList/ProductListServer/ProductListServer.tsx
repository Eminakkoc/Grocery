import { Product } from '@/types/Product';
import ProductItem from '../../ProductItem';

export default async function ProductListServer() {
    const res = await fetch(
        'https://eminakkoc.github.io/ecommerce/mock-api/products-1.json'
    );
    const products = (await res.json()) as Product[];

    return (
        <div className="grid grid-cols-[300px_300px_300px] gap-(--spacing-m) m-auto">
            {products.map((p) => (
                <ProductItem key={p.id} product={p} />
            ))}
        </div>
    );
}
