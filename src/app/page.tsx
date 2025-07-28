import ProductList from '@/components/ProductList';
import Sidebar from '@/components/Sidebar';

export default function Home() {
    return (
        <div className="flex gap-(--spacing-m) sm:items-start h-full overflow-auto p-l">
            <Sidebar />
            <main className="flex flex-col gap-(--spacing-m) flex-1 pl-(--spacing-m) pr-(--spacing-m)">
                <h1>Emins Grocery store</h1>
                <ProductList />
            </main>
        </div>
    );
}
