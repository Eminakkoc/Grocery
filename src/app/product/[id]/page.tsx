import Image from 'next/image';
import { API_URL, BASE_URL } from '@/constants/fetch';
import { notFound } from 'next/navigation';
import { ProductDetail } from '@/types/Product';
import ProductItem from '@/components/ProductItem';
import AmountSpinner from '@/components/AmountSpinner';

interface Props {
    params: {
        id: string;
    };
}

export default async function ProductDetailPage({ params }: Props) {
    const { id } = await params;
    const res = await fetch(`${API_URL}${id}.json`);

    if (!res.ok) {
        notFound();
    }

    const product = (await res.json()) as ProductDetail;

    return (
        <div className="flex flex-col justify-center py-(--spacing-2xl) max-lg:py-(--spacing-xl) gap-(--spacing-2xl) w-[916px] m-auto max-lg:w-full">
            <div className="grid grid-cols-[200px_500px] max-md:grid-cols-[200px_300px] max-sm:grid-cols-[300px] max-sm:grid-rows-[300px_300px] gap-(--spacing-m) w-[700px] max-md:w-auto max-lg:m-auto">
                <div className="flex card items-center justify-center">
                    <Image
                        unoptimized
                        src={`${BASE_URL}${product.imageData}`}
                        className="pixelate"
                        width={120}
                        height={120}
                        alt={`${product.name} image`}
                    />
                </div>
                <section className="flex flex-col gap-(--spacing-s)">
                    <span className="large-text font-bold">{product.name}</span>
                    <span className="small-text">{product.region}</span>
                    <span className="default-text">{product.description}</span>
                    <span className="default-text font-bold">
                        {product.pricePerKgs.amount}{' '}
                        {product.pricePerKgs.currency} / Kg
                    </span>
                    <AmountSpinner product={product} />
                </section>
            </div>
            <div className="flex flex-col gap-(--spacing-m) m-auto">
                <span className="default-text font-bold">
                    Related Products:
                </span>
                <div className="flex gap-(--spacing-s) max-sm:flex-col justify-center max-lg:flex-col max-md:flex-row flex-wrap">
                    {product.relatedProducts.map((relatedProduct) => (
                        <ProductItem
                            key={relatedProduct.id}
                            product={relatedProduct}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
