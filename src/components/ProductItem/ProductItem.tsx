import { Product } from '@/types/Product';
import Image from 'next/image';
import AmountSpinner from '../AmountSpinner';
import Link from 'next/link';
import { BASE_URL } from '@/constants/fetch';

interface Props {
    product: Product;
}

export default function ProductItem({ product }: Props) {
    return (
        <Link
            href={`/product/${product.id}`}
            className="cursor-pointer flex flex-col items-center gap-(--spacing-s) card w-[300px] h-[300px] max-md:w-[200px] max-md:h-[230px] max-sm:w-[300px] max-sm:h-[300px] p-(--spacing-m)"
        >
            <Image
                unoptimized
                src={`${BASE_URL}${product.imageData}`}
                className="pixelate max-md:w-[40px] max-sm:w-[80px]"
                width={80}
                height={80}
                alt={`${product.name} image`}
            />
            <span className="small-text">{product.name}</span>
            <span className="default-text font-bold">
                {product.pricePerKgs.amount} {product.pricePerKgs.currency} / Kg
            </span>
            <AmountSpinner product={product} />
        </Link>
    );
}
