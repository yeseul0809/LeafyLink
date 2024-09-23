import { Product } from '@/types/product';

export function handleValidateForm(state: Product | null, imagePreview: string | null): boolean {
  return (
    !!state?.category &&
    !!state?.title &&
    !!state?.price &&
    !!state?.stock &&
    !!imagePreview &&
    !!state?.description
  );
}
