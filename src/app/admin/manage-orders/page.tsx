import ManageOrdersClient from "../../../components/admin/ManageOrdersClient";
import getOrders from "../../../../actions/getOrders";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/components/NullData";
import Container from "@/components/Container";
export const dynamic = "force-dynamic";

const ManageOrders = async () => {
  const currentUser = await getCurrentUser();
  const orders = await getOrders();

  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Oops! Access denied" />;

  if (orders.length === 0) {
    return <NullData title="No order yet" />;
  }
  return (
    <div className="pt-8">
      <Container>
        <ManageOrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrders;
