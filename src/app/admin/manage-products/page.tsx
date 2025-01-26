import Container from "@/components/Container";
import ManageProductsClient from "../../../components/admin/ManageProductsClient";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/components/NullData";
import getProducts from "../../../../actions/getProducts";
export const dynamic = "force-dynamic";

const ManageProducts = async () => {
  const currentUser = await getCurrentUser();
  const products = await getProducts({ category: null });

  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Oops! Access denied" />;

  if (products.length === 0) {
    return <NullData title="Add products" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageProductsClient products={products} />
      </Container>
    </div>
  );
};

export default ManageProducts;
