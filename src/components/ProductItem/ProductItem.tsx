import { Product } from '@/types/Product';
import Image from 'next/image';

interface Props {
    product: Product;
}

export default function ProductItem({ product }: Props) {
    return (
        <div className="flex flex-col items-center gap-(--spacing-s) card w-[300px] h-[300px] p-(--spacing-m)">
            <Image
                unoptimized
                src={`https://eminakkoc.github.io/ecommerce${product.imageData}`}
                className="pixelate"
                width={80}
                height={80}
                alt={`${product.name} image`}
            />
            <span className="small-text">{product.name}</span>
            <span className="default-text font-bold">
                {product.pricePerKgs.amount} {product.pricePerKgs.currency} / Kg
            </span>
        </div>
    );
}
