import { Product } from '../types/Product';
import { formatPrice } from './formaPrice';

export function formatProducts(products: Product[]): Product[] {
  return products.map((product: Product) => ({
    ...product,
    uriImg: `http://192.168.15.200:3333/upload/${product.imagePath}`,
    priceFormatted: formatPrice(product.price)
  }));
}
