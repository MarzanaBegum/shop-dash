"use client";
import { Order, Product, User } from "@prisma/client";
import { useEffect, useState } from "react";
import Heading from "../Heading";
import { formatePrice } from "../../../utils/formate";
import { formateNumber } from "../../../utils/formateNumber";

interface SummaryProps {
  products: Product[];
  orders: Order[];
  users: User[];
}
type SummaryDataProps = {
  [key: string]: {
    label: string;
    digit: number;
  };
};
const Summary: React.FC<SummaryProps> = ({ products, orders, users }) => {
  const [summaryData, setSummaryData] = useState<SummaryDataProps>({
    sale: { label: "Total Sales", digit: 0 },
    products: { label: "Total products", digit: 0 },
    orders: { label: "Total orders", digit: 0 },
    unpaidOrders: { label: "Unpaid Orders", digit: 0 },
    paidOrders: { label: "Paid Orders", digit: 0 },
    users: { label: "Total users", digit: 0 },
  });

  useEffect(() => {
    setSummaryData((prev) => {
      const tempData = { ...prev };

      const totalSale = orders.reduce((acc, item) => {
        if (item.status === "complete") {
          return acc + item.amount;
        } else return acc;
      }, 0);

      const paidOrder = orders.filter((item) => {
        return item.status === "complete";
      });
      const unPaidOrder = orders.filter((item) => {
        return item.status === "pending";
      });

      tempData.sale.digit = totalSale;
      tempData.orders.digit = orders.length;
      tempData.paidOrders.digit = paidOrder.length;
      tempData.unpaidOrders.digit = unPaidOrder.length;
      tempData.products.digit = products.length;
      tempData.users.digit = users.length;

      return tempData;
    });
  }, [products, orders, users]);

  const summaryKeys = Object.keys(summaryData);
  return (
    <div className="max-w-[1150px] m-auto">
      <div className="mb-4 mt-8">
        <Heading title="Stats" center />
      </div>
      <div className="grid grid-cols-2 gap-3 overflow-y-auto">
        {summaryKeys &&
          summaryKeys.map((key) => {
            return (
              <div
                key={key}
                className="rounded-xl border-2 p-4 gap-2 flex flex-col items-center transition"
              >
                <div className="text-xl md:text-4xl font-bold">
                  {summaryData[key].label === "Total Sale" ? (
                    <>{formatePrice(summaryData[key].digit)}</>
                  ) : (
                    <>{formateNumber(summaryData[key].digit)}</>
                  )}
                </div>
                <div>{summaryData[key].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
