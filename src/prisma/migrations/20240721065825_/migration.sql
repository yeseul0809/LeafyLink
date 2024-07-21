-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_cart_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Chatroom" DROP CONSTRAINT "Chatroom_chatroom_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Livestream" DROP CONSTRAINT "Livestream_livestream_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Livestream" DROP CONSTRAINT "Livestream_livestream_seller_id_fkey";

-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_message_chatroom_id_fkey";

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Product" DROP CONSTRAINT "Product_productseller_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_review_product_id_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_review_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_productseller_id_fkey" FOREIGN KEY ("productseller_id") REFERENCES "Seller"("seller_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_order_user_id_fkey" FOREIGN KEY ("order_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_cart_user_id_fkey" FOREIGN KEY ("cart_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_cart_product_id_fkey" FOREIGN KEY ("cart_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_review_user_id_fkey" FOREIGN KEY ("review_user_id") REFERENCES "User"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_review_product_id_fkey" FOREIGN KEY ("review_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Chatroom" ADD CONSTRAINT "Chatroom_chatroom_product_id_fkey" FOREIGN KEY ("chatroom_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_message_chatroom_id_fkey" FOREIGN KEY ("message_chatroom_id") REFERENCES "Chatroom"("chatroom_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livestream" ADD CONSTRAINT "Livestream_livestream_seller_id_fkey" FOREIGN KEY ("livestream_seller_id") REFERENCES "Seller"("seller_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Livestream" ADD CONSTRAINT "Livestream_livestream_product_id_fkey" FOREIGN KEY ("livestream_product_id") REFERENCES "Product"("product_id") ON DELETE CASCADE ON UPDATE CASCADE;
