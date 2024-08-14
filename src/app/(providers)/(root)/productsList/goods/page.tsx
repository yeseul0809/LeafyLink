import { getGoodsData } from '../actions';
import ProductsList from '../_components/ProductsList';

async function GoodsPage() {
  const itemsPerPage = 3;
  const { Product, totalCount } = await getGoodsData(itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      category="원예용품"
    />
  );
}

export default GoodsPage;
