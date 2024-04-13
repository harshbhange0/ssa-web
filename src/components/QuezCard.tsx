import Typography from "@mui/material/Typography";
import { Fragment, useState } from "react";
import QuestionCard from "./QuestionCard";
import { getDateAndTime } from "../utils/time";
import { Accordion, AccordionDetails, AccordionSummary } from "./ui/AccordionStyles";
import { QueProps, QuizProps } from "../types/quiz_types";



const QuizCard = ({ title, date, subject, questions }: QuizProps) => {
  const [expanded, setExpanded] = useState<string | false>("panel1");

  const handleChange =
    (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
      event;
    };
  const fdate = getDateAndTime(date);

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
            <Typography>{fdate}</Typography>
          </div>
        </div>
      </AccordionSummary>
      <AccordionDetails
        sx={{ gap: 2, display: "flex", flexDirection: "column" }}
      >
        {questions.map((q: QueProps, i: any) => (
          <Fragment key={q._id}>
            <QuestionCard
              qIndex={i}
              lastQuestion={questions.length - i === 1}
              answerIndex={q.answerIndex}
              options={q.options}
              question={q.question}
              key={q._id}
            />
          </Fragment>
        ))}
      </AccordionDetails>
    </Accordion>
  );
};

export default QuizCard;
