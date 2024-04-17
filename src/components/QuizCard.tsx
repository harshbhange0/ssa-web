import QuizDialog from "./QuizDialog";

export default function QuizCard({ type }: { type: "add" | "update" }) {
  if (type == "update") {
    return <QuizDialog type={type} />;
  }

  return <QuizDialog type={type} />;
}
