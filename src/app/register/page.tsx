import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import React from "react";
import RegisterForm from "../../components/registerLogin/RegisterForm";
import { getCurrentUser } from "../../../actions/getCurrentUser";
export const dynamic = "force-dynamic";

const Register = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <RegisterForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Register;
