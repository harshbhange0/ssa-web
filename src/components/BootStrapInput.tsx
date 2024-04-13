import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import { BootStrapInputProps } from "../types/bootStrapInput_types";
import { BootstrapInput } from "./ui/bootstrapStyles";

export default function BootStrapInput({
  error,
  value,
  setValue,
  label,
  type = "text",
}: BootStrapInputProps) {
  return (
    <>
      <FormControl variant="standard" error={error}>
        <InputLabel shrink htmlFor="bootstrap-input">
          {label}
        </InputLabel>
        <BootstrapInput
          error={error}
          sx={{ Width: "100%" }}
          autoComplete="off"
          autoCapitalize="on"
          type={type}
          value={value}
          onChange={setValue}
          id="bootstrap-input"
        />
      </FormControl>
    </>
  );
}
