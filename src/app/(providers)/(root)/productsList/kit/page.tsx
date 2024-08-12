import { getKitData } from '../actions';
import ProductsList from '../_components/ProductsList';

async function Kit() {
  const itemsPerPage = 3;
  const { Product, totalCount } = await getKitData(itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      fetchMoreData={getKitData}
    />
  );
}

export default Kit;
