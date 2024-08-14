import { getSeedlingData } from '../actions';
import ProductsList from '../_components/ProductsList';

async function Seedling() {
  const itemsPerPage = 3;
  const { Product, totalCount } = await getSeedlingData(itemsPerPage, 0);

  return (
    <ProductsList
      initialData={Product || []}
      totalItems={totalCount || 0}
      itemsPerPage={itemsPerPage}
      category="모종"
    />
  );
}

export default Seedling;
