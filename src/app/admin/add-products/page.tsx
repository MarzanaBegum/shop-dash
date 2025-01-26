import Container from "@/components/Container";
import FormWrap from "@/components/FormWrap";
import AddProductForm from "../../../components/admin/AddProductForm";
import { getCurrentUser } from "../../../../actions/getCurrentUser";
import NullData from "@/components/NullData";
export const dynamic = "force-dynamic";

const AddProducts = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser || currentUser.role !== "ADMIN")
    return <NullData title="Oops! Access denied" />;
  return (
    <div>
      <Container>
        <FormWrap>
          <AddProductForm />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProducts;
