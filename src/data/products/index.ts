import { Product } from './types';
import { sembakoProducts } from './sembako';
import { atkProducts } from './atk';
import { minumanProducts } from './minuman';
import { snackProducts } from './snack';
import { pembersihProducts } from './pembersih';

export type { Product } from './types';

export const PRODUCTS: Product[] = [
  ...sembakoProducts,
  ...atkProducts,
  ...minumanProducts,
  ...snackProducts,
  ...pembersihProducts
];

export { sembakoProducts } from './sembako';
export { atkProducts } from './atk';
export { minumanProducts } from './minuman';
export { snackProducts } from './snack';
export { pembersihProducts } from './pembersih';
