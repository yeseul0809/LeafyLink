'use server';
import { createClient } from '@/supabase/supabaseServer';
import { Order } from '@/types/order';
// export const getProducts = async () => {
//   const supabase = createClient();
//   const { data: product, error } = await supabase.from('Product').select('*');
//   if (error) throw error;
//   return product;
// };
interface Product {
  product_id: string;
  title: string;
  price: number;
  thumbnail_url: string;
  created_at: string;
  stock: number;
  product_seller_id: string;
}
export interface ProductWithBusinessName extends Product {
  business_name: string;
}
export const getUserData = async () => {
  const supabase = createClient();
  const { data } = await supabase.auth.getUser();
  if (data.user) {
    const userId = data.user.id;
    const { data: userData, error } = await supabase
      .from('User')
      .select('*')
      .eq('user_id', userId)
      .single();
    if (error) {
      throw error;
    }
    return userData;
  }
  return null;
};
export const getProducts = async (): Promise<ProductWithBusinessName[]> => {
  const supabase = createClient();

  const { data: productData, error: productError } = await supabase
    .from('Product')
    .select()
    .neq('stock', 0);

  if (productError) {
    console.error(productError);
    return [];
  }

  const sellerIds = Array.from(new Set(productData.map((product) => product.product_seller_id)));

  const { data: sellerData, error: sellerError } = await supabase
    .from('Seller')
    .select('seller_id, business_name')
    .in('seller_id', sellerIds);

  if (sellerError) {
    console.error(sellerError);
    return [];
  }

  const sellerMap = sellerData.reduce(
    (acc, seller) => {
      acc[seller.seller_id] = seller.business_name;
      return acc;
    },
    {} as Record<string, string>
  );

  const productsWithBusinessName = productData.map((product) => ({
    ...product,
    business_name: sellerMap[product.product_seller_id] || 'Unknown'
  }));

  return productsWithBusinessName;
};

export const getSellerName = async (sellerId: string) => {
  const supabase = createClient();
  const { data: seller, error } = await supabase
    .from('Seller')
    .select('business_name')
    .eq('seller_id', sellerId)
    .single();
  if (error) throw error;
  return seller;
};
export const getOrderInfo = async (): Promise<Order[]> => {
  const supabase = createClient();
  const { data: orderProduct, error } = await supabase
    .from('Order')
    .select('*')
    .eq('is_payed', true)
    .order('order_date', { ascending: false })
    .range(0, 100);
  if (error) throw error;
  return orderProduct;
};
export const getRecommendPlant = async () => {
  const supabase = createClient();
  const { data: products, error: productError } = await supabase
    .from('Product')
    .select('*')
    .or('category.eq.씨앗, category.eq.모종');
  if (productError) throw productError;
  return products;
};

// export const getGoodsproducts = async () => {
//   const supabase = createClient();
//   const { data: goodsProducts, error: productError } = await supabase
//     .from('Product')
//     .select('*')
//     .eq('category', '원예용품');

//   if (productError) throw productError;
//   return goodsProducts;
// };

export const getGoodsproducts = async (): Promise<ProductWithBusinessName[]> => {
  const supabase = createClient();

  const { data: productData, error: productError } = await supabase
    .from('Product')
    .select()
    .neq('stock', 0)
    .eq('category', '원예용품');

  if (productError) {
    console.error(productError);
    return [];
  }

  const sellerIds = Array.from(new Set(productData.map((product) => product.product_seller_id)));

  const { data: sellerData, error: sellerError } = await supabase
    .from('Seller')
    .select('seller_id, business_name')
    .in('seller_id', sellerIds);

  if (sellerError) {
    console.error(sellerError);
    return [];
  }

  const sellerMap = sellerData.reduce(
    (acc, seller) => {
      acc[seller.seller_id] = seller.business_name;
      return acc;
    },
    {} as Record<string, string>
  );

  const productsWithBusinessName = productData.map((product) => ({
    ...product,
    business_name: sellerMap[product.product_seller_id] || 'Unknown'
  }));

  return productsWithBusinessName;
};

export const getBestSellerProducts = async (orderData: Order[]) => {
  const supabase = createClient();
  const { data: products, error: productsError } = await supabase
    .from('Product')
    .select('*')
    .or(
      `product_id.eq.${orderData[0].order_product_id}, product_id.eq.${orderData[1].order_product_id}, product_id.eq.${orderData[2].order_product_id}, product_id.eq.${orderData[3].order_product_id}`
    );
  if (productsError) throw productsError;

  const sellerIds = Array.from(new Set(products.map((product) => product.product_seller_id)));

  const { data: sellerData, error: sellerError } = await supabase
    .from('Seller')
    .select('seller_id, business_name')
    .in('seller_id', sellerIds);

  if (sellerError) {
    console.error(sellerError);
    return [];
  }

  const sellerMap = sellerData.reduce(
    (acc, seller) => {
      acc[seller.seller_id] = seller.business_name;
      return acc;
    },
    {} as Record<string, string>
  );

  const productsWithBusinessName = products.map((product) => ({
    ...product,
    business_name: sellerMap[product.product_seller_id] || 'Unknown'
  }));

  return productsWithBusinessName;
};
