import Container from "@/components/Container";
import ListRating from "@/components/product/ListRating";
import ProductDetails from "@/components/product/ProductDetails";
import getProductById from "../../../../actions/getProductById";
import NullData from "@/components/NullData";
import AddRating from "@/components/product/AddRating";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
export const dynamic = "force-dynamic";

interface IParams {
  productId?: string;
}
const page = async ({ params }: { params: IParams }) => {
  const product = await getProductById(params);
  const user = await getCurrentUser();

  if (!product)
    return <NullData title="Oops! Product with the given id does not exit" />;

  return (
    <div className="p-8">
      <Container>
        <ProductDetails product={product} />
        <div className="mt-20 flex flex-col gap-4">
          <AddRating product={product} user={user} />
          <ListRating product={product} />
        </div>
      </Container>
    </div>
  );
};

export default page;
