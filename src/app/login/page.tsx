import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import LoginForm from "../../components/registerLogin/LoginForm";
import { getCurrentUser } from "../../../actions/getCurrentUser";
export const dynamic = "force-dynamic";

const Login = async () => {
  const currentUser = await getCurrentUser();
  return (
    <Container>
      <FormWrap>
        <LoginForm currentUser={currentUser} />
      </FormWrap>
    </Container>
  );
};

export default Login;
