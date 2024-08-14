import ProductsList from '../_components/ProductsList';
import { getDataByCategory } from '../actions';

export default async function CategoryPage({ params }: { params: { category: string } }) {
  const itemsPerPage = 3;
  const category = decodeURIComponent(params.category);

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
