import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import QuestionCard from "./QuestinCard";
import { Divider } from "@mui/material";

const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  margin: " .5rem 0",
  "&::before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#fff" : "#fff",
  flexDirection: "row-reverse",
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

interface QuizProps {
  title: string;
  date: string;
  subject: string;
  quizId: string;
  questions: {
    question: string;
    options: string[];
    answerIndex: number;
    _id: string;
  }[];
}

const QuizCard = ({ title, date, subject, quizId, questions }: QuizProps) => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      event;
    };
  quizId;
  return (
    <Accordion
      expanded={expanded === "panel2"}
      onChange={handleChange("panel2")}
    >
      <AccordionSummary aria-controls="panel2d-content" id="panel2d-header">
        <div className="flex w-full items-center justify-between">
          <Typography variant="h5" className="line-clamp-1 capitalize">
            {title}
          </Typography>
          <div className="grid grid-cols-2 gap-1 capitalize">
            <Typography>{subject}</Typography>
            <Typography>{date}</Typography>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{ gap: 2, display: "flex", flexDirection: "column" }}
      >
        {questions.map((q, i) => {
          return (
            <Fragment key={q._id}>
              <QuestionCard
                qIndex={i}
                lastQuestion={questions.length - i == 1 ? true : false}
                answerIndex={q.answerIndex}
                options={q.options}
                question={q.question}
                key={q._id}
              />
              <Divider />
            </Fragment>
          );
        })}
      </AccordionDetails>
    </Accordion>
  );
};

export default QuizCard;
