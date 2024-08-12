import ProductsList from '../_components/ProductsList';
import { getSoilData } from '../actions';

async function Soil() {
  const itemsPerPage = 3;
  const { Product, totalCount } = await getSoilData(itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      fetchMoreData={getSoilData}
    />
  );
}

export default Soil;
