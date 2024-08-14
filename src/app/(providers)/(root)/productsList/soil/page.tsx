import ProductsList from '../_components/ProductsList';
import { getDataByCategory } from '../actions';

async function GoodsPage() {
  const itemsPerPage = 3;
  const category = '흙,비료';
  const { Product, totalCount } = await getDataByCategory(category, itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      category={category}
    />
  );
}

export default GoodsPage;
