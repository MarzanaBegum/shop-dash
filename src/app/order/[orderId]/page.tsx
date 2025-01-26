import Container from "@/components/Container";
import OrderDetails from "@/components/order/OrderDetails";
import getOrderById from "../../../../actions/getOrderById";
import NullData from "@/components/NullData";

interface IPrams {
  orderId?: string;
}
const Order = async ({ params }: { params: IPrams }) => {
  const order = await getOrderById(params);

  if (!order) return <NullData title="No order found" />;
  return (
    <div className="p-8">
      <Container>
        <OrderDetails order={order} />
      </Container>
    </div>
  );
};

export default Order;
