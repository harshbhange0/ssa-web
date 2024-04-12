import { useParams } from "react-router-dom";
import SideBar from "../../components/SideBar";
import { Container } from "@mui/material";

export default function Dashboard() {
  const { subject } = useParams();
  return (
    <div className="flex flex-row">
      <SideBar />
      <Container maxWidth="md" sx={{ pt: 10 }} className="w-auto">
        <span>{subject}</span>
      </Container>
    </div>
  );
}
