import { getSellerName } from '@/app/(providers)/(root)/(home)/actions';
import { create } from 'zustand';

interface SellerState {
  businessName: string;
  setbusinessName: (productSellerId: string) => Promise<void>;
}

export const useSellerStore = create<SellerState>((set) => ({
  businessName: '',
  setbusinessName: async (productSellerId: string) => {
    try {
      const businessName = await getSellerName(productSellerId);
      set({ businessName: businessName.business_name });
    } catch (error) {
      console.error('판매자 정보 가져오는 중 에러발생', error);
    }
  }
}));
