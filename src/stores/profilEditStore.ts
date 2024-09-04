import { create } from 'zustand';

interface AddressForm {
  address: string;
  detailAddress: string;
  postcode: string;
  extraAddress: string;
}

interface FormState {
  addressForm: AddressForm;
  phone: string;
  userName: string;
  isLoading: boolean;

  setAddress: (address: string) => void;
  setDetailAddress: (detailAddress: string) => void;
  setPostcode: (postcode: string) => void;
  setExtraAddress: (extraAddress: string) => void;
  setPhone: (phone: string) => void;
  setUserName: (userName: string) => void;
  setLoading: (isLoading: boolean) => void;
}

export const useFormState = create<FormState>((set) => ({
  addressForm: {
    address: '',
    detailAddress: '',
    postcode: '',
    extraAddress: ''
  },
  phone: '',
  userName: '',
  isLoading: false,

  setAddress: (address) =>
    set((state) => ({
      ...state,
      addressForm: { ...state.addressForm, address }
    })),
  setDetailAddress: (detailAddress) =>
    set((state) => ({
      ...state,
      addressForm: { ...state.addressForm, detailAddress }
    })),
  setPostcode: (postcode) =>
    set((state) => ({
      ...state,
      addressForm: { ...state.addressForm, postcode }
    })),
  setExtraAddress: (extraAddress) =>
    set((state) => ({
      ...state,
      addressForm: { ...state.addressForm, extraAddress }
    })),

  setPhone: (phone) => set((state) => ({ ...state, phone })),

  setUserName: (userName) => set((state) => ({ ...state, userName })),

  setLoading: (isLoading) => set((state) => ({ ...state, isLoading }))
}));
interface SellerFormState {
  address: string;
  detailAddress: string;
  postcode: string;
  extraAddress: string;
  businessName: string;
  phone: string;
  setAddress: (address: string) => void;
  setDetailAddress: (detailAddress: string) => void;
  setPostcode: (postcode: string) => void;
  setExtraAddress: (extraAddress: string) => void;
  setBusinessName: (businessName: string) => void;
  setPhone: (phone: string) => void;
}

export const useSellerFormState = create<SellerFormState>((set) => ({
  address: '',
  detailAddress: '',
  postcode: '',
  extraAddress: '',
  businessName: '',
  phone: '',
  setAddress: (address) => set(() => ({ address })),
  setDetailAddress: (detailAddress) => set(() => ({ detailAddress })),
  setPostcode: (postcode) => set(() => ({ postcode })),
  setExtraAddress: (extraAddress) => set(() => ({ extraAddress })),
  setBusinessName: (businessName) => set(() => ({ businessName })),
  setPhone: (phone) => set(() => ({ phone }))
}));
