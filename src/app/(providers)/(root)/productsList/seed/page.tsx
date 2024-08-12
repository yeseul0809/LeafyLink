import { getSeedData } from '../actions';
import ProductsList from '../_components/ProductsList';

async function Seed() {
  const itemsPerPage = 3;
  const { Product, totalCount } = await getSeedData(itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      fetchMoreData={getSeedData}
    />
  );
}

export default Seed;
