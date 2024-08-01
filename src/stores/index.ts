import { deleteCart } from '@/app/(providers)/(root)/cart/actions';
import { createClient } from '@/supabase/supabaseClient';
import { create } from 'zustand';

interface QuantityState {
  quantities: { [key: string]: { quantity: number; price: number } };
  setQuantity: (productId: string, quantity: number, price: number) => void;
}

export const useQuantityStore = create<QuantityState>((set) => ({
  quantities: {},
  setQuantity: (productId: string, quantity: number, price: number) =>
    set((state) => ({
      quantities: {
        ...state.quantities,
        [productId]: { quantity, price }
      }
    }))
}));

interface CartState {
  cart: { [productId: string]: { isChecked: boolean; quantity: number } };
  selectAll: boolean;
  updateItem: (productId: string, isChecked: boolean, userId: string) => void;
  toggleSelectAll: (userId: string, isChecked: boolean) => void;
  removeSelectedItems: (userId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeItem: (productId: string) => void;
  initializeCart: (userId: string) => Promise<void>;
  isAnyChecked: boolean;
}

export const useCartStore = create<CartState>((set) => ({
  cart: {},
  selectAll: false,
  isAnyChecked: false,
  initializeCart: async (userId: string) => {
    try {
      const supabase = createClient();
      const { data: cartData, error } = await supabase
        .from('Cart')
        .select('*')
        .eq('cart_user_id', userId);

      if (error) {
        throw error;
      }

      const cart = cartData.reduce(
        (acc: { [productId: string]: { isChecked: boolean; quantity: number } }, item: any) => {
          acc[item.cart_product_id] = { isChecked: item.is_checked, quantity: item.count };
          return acc;
        },
        {}
      );

      set({ cart });
    } catch (error) {
      console.error('Failed to initialize cart from database', error);
    }
  },
  updateQuantity: async (productId: string, quantity: number) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('Cart')
        .update({ count: quantity })
        .eq('cart_product_id', productId);

      if (error) {
        throw error;
      }

      set((state) => ({
        cart: {
          ...state.cart,
          [productId]: {
            ...(state.cart[productId] || {}),
            quantity
          }
        }
      }));
    } catch (error) {
      console.error('Failed to update quantity in cart', error);
    }
  },
  updateItem: async (productId: string, isChecked: boolean, userId: string) => {
    try {
      const supabase = createClient();
      await supabase
        .from('Cart')
        .update({ is_checked: isChecked })
        .eq('cart_product_id', productId);

      set((state) => ({
        cart: {
          ...state.cart,
          [productId]: { ...state.cart[productId], isChecked }
        }
      }));
    } catch (error) {
      console.error('Failed to update item in cart', error);
    }
  },
  toggleSelectAll: async (userId: string, isChecked: boolean) => {
    try {
      const supabase = createClient();
      await supabase.from('Cart').update({ is_checked: isChecked }).eq('cart_user_id', userId);

      set((state) => ({
        cart: Object.keys(state.cart).reduce(
          (acc, productId) => {
            acc[productId] = { ...state.cart[productId], isChecked };
            return acc;
          },
          {} as CartState['cart']
        ),
        selectAll: isChecked
      }));
    } catch (error) {
      console.error('Failed to toggle select all', error);
    }
  },
  removeSelectedItems: async (userId: string) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('Cart')
        .delete()
        .eq('cart_user_id', userId)
        .is('is_checked', true);

      if (error) throw error;

      set((state) => ({
        cart: Object.fromEntries(Object.entries(state.cart).filter(([_, item]) => !item.isChecked))
      }));
    } catch (error) {
      console.error('Failed to remove selected items', error);
    }
  },
  removeItem: async (productId: string) => {
    try {
      await deleteCart(productId);
      set((state) => {
        const newCart = { ...state.cart };
        delete newCart[productId];
        return { cart: newCart };
      });
    } catch (error) {
      console.error('Failed to delete item from cart', error);
    }
  }
}));
