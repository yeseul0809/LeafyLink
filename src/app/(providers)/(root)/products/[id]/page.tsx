import ProductReviewList from './_components/ReviewList';
import TopSection from './_components/TopSection';
import { getProductRequest, getReviews } from './_actions/productActions';
import Image from 'next/image';
import ButtonsWrapper from './_components/ButtonsWrapper';
import MiddleSectionWrapper from './_components/MiddleSectionWrapper';

interface ParamsProps {
  params: { id: string };
}

async function ProductDetailPage({ params }: ParamsProps) {
  const { id } = params;
  const product = await getProductRequest(id);
  const reviewsPerPage = 10;
  const reviewData = await getReviews(id, reviewsPerPage, 0);

  if (!product) {
    return <p>해당 상품이 없습니다.</p>;
  }

  const reviewCount = reviewData.totalCount || 0;
  const totalRating = reviewData.reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
  const averageRating = reviewCount > 0 ? totalRating / reviewCount : 0;

  const cloudinaryUrl = `https://res.cloudinary.com/drquzurim/image/fetch/f_webp/${product.thumbnail_url}`;

  return (
    <div className="container mx-auto xs:max-w-screen-lg py-0 md:py-20">
      <section className="flex justify-center flex-col md:flex-row md:gap-[80px]">
        <div className="w-full h-[375px] overflow-hidden md:w-[485px] md:h-[485px] flex-shrink-0 justify-center md:rounded-[28px]">
          <Image
            src={cloudinaryUrl}
            alt={product.title}
            width={375}
            height={375}
            priority
            className="object-cover w-full h-full md:w-[485px] md:h-[485px] md:rounded-lg"
          />
        </div>
        <div className="px-[20px] md:px-0 pt-[20px] md:pt-0 flex flex-col justify-center md:w-[505px]">
          <TopSection product={product} averageRating={averageRating} reviewCount={reviewCount} />
          <ButtonsWrapper
            productId={product.product_id}
            productPrice={product.price}
            productTitle={product.title}
            productSellerId={product.product_seller_id}
          />
        </div>
      </section>
      <MiddleSectionWrapper
        productDescription={product.description}
        reviewProductId={id}
        reviewCount={reviewCount}
      />
      <ProductReviewList productId={product.product_id} reviewsPerPage={reviewsPerPage} />
    </div>
  );
}

export default ProductDetailPage;
