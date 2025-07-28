import ProductListServer from './ProductListServer';
import ProductListClient from './ProductListClient';

export default function ProductList() {
    return (
        <>
            <ProductListServer />
            <ProductListClient />
        </>
    );
}
