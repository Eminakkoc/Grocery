import ProductList from '@/components/ProductList';
import Sidebar from '@/components/Sidebar';

export default async function Page({
    searchParams,
}: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
    const params = await searchParams;
    return (
        <div className="flex gap-(--spacing-m) sm:items-start h-full overflow-auto p-l py-xl">
            <Sidebar />
            <main className="flex flex-col gap-(--spacing-m) flex-1 pl-(--spacing-m) max-md:pl-0 pr-(--spacing-m) max-md:pr-0">
                <ProductList searchParams={params} />
            </main>
        </div>
    );
}
