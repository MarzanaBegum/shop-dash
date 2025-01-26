import Summary from "@/components/admin/Summary";
import getProducts from "../../../actions/getProducts";
import getOrders from "../../../actions/getOrders";
import getUsers from "../../../actions/getUsers";
import BarChat from "@/components/admin/BarChat";
import getGraphData from "../../../actions/getGraphData";
export const dynamic = "force-dynamic";

const Admin = async () => {
  const products = await getProducts({ category: null });
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div className="p-8">
      <Summary products={products} orders={orders} users={users} />
      <div className="mt-4 mx-auto max-w-[1150px]">
        <BarChat data={graphData} />
      </div>
    </div>
  );
};

export default Admin;
