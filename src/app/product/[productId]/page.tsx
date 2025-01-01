import Container from "@/components/Container";
import ProductDetail from "@/components/product/ProductDetail";
import ListRating from "@/components/product/ListRating";
import { products } from "../../../../utils/products";

interface IPrams {
  productId: string;
}
const page = ({ params }: { params: IPrams }) => {
  const product = products.find((item) => item.id === params.productId);
  return (
    <div className="p-8">
      <Container>
        <ProductDetail product={product} />
        <div className="mt-20 flex flex-col gap-4">
          <div>Add Reviews</div>
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default page;
