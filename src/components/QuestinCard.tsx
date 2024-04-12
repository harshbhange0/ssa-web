import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

interface QuestionCardProps {
  question: string;
  options: string[];
  answerIndex: number;
  lastQuestion?: boolean;
  qIndex?: any;
}
const QuestionCard = ({
  question,
  options,
  answerIndex,
  lastQuestion,
  qIndex,
}: QuestionCardProps) => {
  const [isEditable, setEditable] = useState<boolean>(true);
  const [que, setQue] = useState<QuestionCardProps>({
    question,
    options,
    answerIndex,
  });

  const [option, setOption] = useState<string[]>(options);

  const handleOptionChange = (index: number, value: string) => {
    setOption((prevOption) => [
      ...prevOption.slice(0, index),
      value,
      ...prevOption.slice(index + 1),
    ]);
  };
  qIndex;
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        border: ".1rem solid #ccc",
        p: 1,
      }}
      component={"div"}
    >
      <div className="  p-2">
        <label className="flex flex-row items-center gap-2">
          <span className="w-auto"></span>
          <input
            readOnly={isEditable}
            type="text"
            className="w-full border-b px-2 outline-none"
            placeholder="Question?"
            value={que.question}
            onChange={(e) => {
              setQue({ ...que, question: e.target.value });
            }}
          />
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2  p-2">
        <div className="">Options</div>
        <label className="ms-[24px] flex items-center justify-center gap-2">
          <input
            readOnly={isEditable}
            type="number"
            placeholder="Correct Answer"
            className={`w-full border-b outline-none `}
            value={que.answerIndex + 1}
            max={4}
            min={1}
            onChange={(e) => {
              setQue({
                ...que,
                answerIndex: parseInt(e.target.value) - 1,
              });
            }}
          />
        </label>
        {option.map((op, i) => {
          return (
            <label
              key={i + "Dsdsf"}
              className="flex items-center justify-center gap-2"
            >
              <span>{i + 1}.</span>
              <input
                readOnly={isEditable}
                type="text"
                className={`${que.answerIndex == i ? "border-emerald-600" : "border-red-600"} w-full border-b outline-none`}
                value={op[i]}
                onChange={(e) => handleOptionChange(i, e.target.value)}
              />
            </label>
          );
        })}
      </div>
      <div
        className={`${lastQuestion ? "grid-cols-4" : "grid-cols-3"} grid  gap-2 p-2`}
      >
        <FormControlLabel
          sx={{ m: 0, display: "flex", justifyContent: "space-evenly" }}
          control={
            <Switch
              value={isEditable}
              onChange={() => setEditable(!isEditable)}
            />
          }
          className={`${isEditable ? "text-[#1976d2]" : ""}`}
          label="Edit"
        />
        <Button disabled={isEditable}>Save</Button>
        <Button>Delete</Button>
        {lastQuestion ? <Button>Add Quiz</Button> : ""}
      </div>
    </Box>
  );
};

export default QuestionCard;
