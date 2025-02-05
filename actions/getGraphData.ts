import moment from "moment";
import prisma from "../libs/prismadb";

export default async function getGraphData() {
  try {
    const startDate = moment().subtract(6, "days").startOf("day");
    const endDate = moment().endOf("day");

    const result = await prisma?.order.groupBy({
      by: ["createdAt"],
      where: {
        createdAt: { gte: startDate.toISOString(), lte: endDate.toISOString() },
      },
      _sum: { amount: true },
    });

    const aggregatedData: {
      [day: string]: { day: string; date: string; totalAmount: number };
    } = {};

    const currentDate = startDate.clone();

    while (currentDate <= endDate) {
      const day = currentDate.format("dddd");

      aggregatedData[day] = {
        day,
        date: currentDate.format("YYYY-MM-DD"),
        totalAmount: 0,
      };

      currentDate.add(1, "day");
    }

    result.forEach((entry) => {
      const day = moment(entry.createdAt).format("dddd");
      const amount = entry._sum.amount || 0;
      aggregatedData[day].totalAmount = amount;
    });

    const formatedData = Object.values(aggregatedData).sort((a, b) =>
      moment(a.date).diff(moment(b.date))
    );

    return formatedData;
  } catch (error: any) {
    throw new Error(error);
  }
}
