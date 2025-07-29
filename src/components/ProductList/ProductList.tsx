import { Product } from '@/types/Product';
import ProductItem from '../ProductItem';
import { SearchParams } from '@/types/SearchParams';
import { constructSearchQuery } from '@/utils/searchQuery';
import Pagination from '@/components/Pagination';

interface Props {
    searchParams: SearchParams;
}

export default async function ProductList({ searchParams }: Props) {
    const params = await searchParams;
    const res = await fetch(constructSearchQuery(params));
    const data = await res.json();
    const products = data.products as Product[];
    return (
        <>
            <div className="grid grid-cols-[300px_300px_300px] max-xl:grid-cols-[300px_300px] max-md:grid-cols-[200px_200px] max-sm:grid-cols-[300px] gap-(--spacing-m) m-auto">
                {products.map((p) => (
                    <ProductItem key={p.id} product={p} />
                ))}
            </div>
            <div className="mt-(--spacing-m) w-full flex items-center justify-center">
                <Pagination
                    currentPage={params.page || '1'}
                    totalPages={data.totalPages}
                    searchParams={params}
                />
            </div>
        </>
    );
}
