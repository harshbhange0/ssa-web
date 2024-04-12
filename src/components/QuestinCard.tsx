import { Box, Button, FormControlLabel, Switch } from "@mui/material";
import { useState } from "react";

interface QuestionCardInputs {
  question: string;
  options: string[];
  answerIndex: number;
}
interface QuestionCardProps {
  question: string;
  options: string[];
  answerIndex: number;
}
const QuestionCard = ({
  question,
  options,
  answerIndex,
}: QuestionCardProps) => {
  const [isEditable, setEditable] = useState<boolean>(true);
  const [que, setQue] = useState<QuestionCardInputs>({
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

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }} component={"div"}>
      <div className="  p-2">
        <label className="flex flex-row items-center gap-2">
          <span className="w-auto">1.</span>
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
        {que.options.map((op, i) => {
          return (
            <label className="flex items-center justify-center gap-2">
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
      <div className="grid grid-cols-4 gap-2 p-2">
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
        <Button>Add</Button>
      </div>
    </Box>
  );
};

export default QuestionCard;
