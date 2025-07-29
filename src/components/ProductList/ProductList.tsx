import { Product } from '@/types/Product';
import ProductItem from '../ProductItem';
import { SearchParams } from '@/types/SearchParams';
import { constructSearchQuery } from '@/utils/searchQuery';
import Pagination from '@/components/Pagination';

interface Props {
    searchParams: SearchParams;
}

export default async function ProductList({ searchParams }: Props) {
    const res = await fetch(constructSearchQuery(searchParams));
    const data = await res.json();
    const products = data.products as Product[];
    return (
        <>
            <div className="grid grid-cols-[300px_300px_300px] gap-(--spacing-m) m-auto">
                {products.map((p) => (
                    <ProductItem key={p.id} product={p} />
                ))}
            </div>
            <Pagination
                currentPage={searchParams.page || 1}
                totalPages={data.totalPages}
                searchParams={searchParams}
            />
        </>
    );
}
