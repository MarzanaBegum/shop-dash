import Container from "@/components/Container";
import React from "react";
import CartClient from "../../components/cart/CartClient";
import { getCurrentUser } from "../../../actions/getCurrentUser";
export const dynamic = "force-dynamic";

const Cart = async () => {
  const currentUser = await getCurrentUser();
  return (
    <div className="pt-8">
      <Container>
        <CartClient currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default Cart;
