import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectComp({
  options,
  handleChange,
  value,
  label,
  error,
  readOnly,
}: {
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
  options: string[];
  error?: boolean;
  readOnly: boolean;
}) {
  return (
    <div>
      <FormControl sx={{ width: "100%", minWidth: "300px" }} size="small">
        <InputLabel id="demo-select-small-label  " error={error}>
          {label}
        </InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label={label}
          variant="standard"
          onChange={handleChange}
          readOnly={readOnly}
          disabled={readOnly}
        >
          <MenuItem value="">
            <>None</>
          </MenuItem>
          {options &&
            options.map((value: string, i: any) => (
              <MenuItem key={i} value={value}>
                {value}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
