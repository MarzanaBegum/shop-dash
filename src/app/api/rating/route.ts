import { NextResponse } from "next/server";
import prisma from "../../../../libs/prismadb";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import { ReviewsType } from "../../../../utils/constant";

export async function POST(req: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { comment, userId, product, rating } = body;

    const deliveredOrder = currentUser?.order.some(
      (item) =>
        item.products.find((prod) => prod.id === product.id) &&
        item.deliveryStatus === "delivered"
    );

    const userReview = product.reviews.find(
      (review: ReviewsType) => review.userId === currentUser.id
    );

    if (!deliveredOrder) {
      return NextResponse.json(
        { message: "You can only review products you've received" },
        { status: 403 }
      );
    }
    if (userReview) {
      return NextResponse.json(
        { message: "You have already reviewed this product" },
        { status: 403 }
      );
    }
    const review = await prisma?.review.create({
      data: { comment, rating, productId: product.id, userId },
    });
    return NextResponse.json(review);
  } catch (error: any) {
    return NextResponse.json(error);
  }
}
