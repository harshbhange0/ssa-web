import { useParams } from "react-router-dom";
import Form from "../../../components/Form";

export default function SignComponent() {
  const { id } = useParams();
  return (
    <>
      <Form type={id == "up" ? "sign-up" : "sign-in"} />
    </>
  );
}
