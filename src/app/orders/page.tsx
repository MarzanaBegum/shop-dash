import NullData from "@/components/NullData";
import { getCurrentUser } from "../../../actions/getCurrentUser";
import Container from "@/components/Container";
import OrdersClient from "../../components/order/OrdersClient";
import getOrdersByUserId from "../../../actions/getOrdersByUserId";
export const dynamic = "force-dynamic";

const Orders = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) return <NullData title="Oops! Access denied" />;

  const orders = await getOrdersByUserId(currentUser.id);
  return (
    <div className="pt-8">
      <Container>
        <OrdersClient orders={orders} />
      </Container>
    </div>
  );
};

export default Orders;
