import { Container } from "@mui/material";

export default function DisplayQuiz() {
  return (
    <Container
      component={"section"}
      maxWidth="md"
      sx={{
        pt: 10,
        pb: 5,
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <div className="header flex flex-col items-center justify-center gap-5 text-center"></div>
      <div className="main"></div>
      <div className="absolute bottom-0 right-[50%] translate-x-[50%] transform"></div>
    </Container>
  );
}
