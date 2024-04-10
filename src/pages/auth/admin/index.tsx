import { useParams } from "react-router-dom";
import Form from "../../../components/Form";

export default function SignComponent() {
  const { id, type } = useParams();
  return (
    <>
      <Form title={type} type={id == "up" ? "sign-up" : "sign-in"} />
    </>
  );
}
