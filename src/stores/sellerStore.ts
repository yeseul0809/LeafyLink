import { getSellerName } from '@/app/(providers)/(root)/(home)/actions';
import { create } from 'zustand';

interface SellerState {
  businessName: string;
  setbusinessName: (productSellerId: string) => Promise<void>;
  cache: { [key: string]: string };
}

export const useSellerStore = create<SellerState>((set, get) => ({
  businessName: '',
  cache: {},

  setbusinessName: async (productSellerId: string) => {
    const { cache } = get();

    if (cache[productSellerId]) {
      set({ businessName: cache[productSellerId] });
      return;
    }

    try {
      const businessName = await getSellerName(productSellerId);
      set((state) => ({
        businessName: businessName.business_name,
        cache: { ...state.cache, [productSellerId]: businessName.business_name }
      }));
    } catch (error) {
      console.error('판매자 정보 가져오는 중 에러발생', error);
    }
  }
}));
