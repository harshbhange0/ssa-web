import React from "react";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

export default function SelectComp({
  options,
  handleChange,
  value,
  label,
  error
}: {
  label: string;
  value: string;
  handleChange: (event: SelectChangeEvent) => void;
    options: string[];
  error:boolean
}) {
  return (
    <div>
      <FormControl sx={{ width: "auto", minWidth: "200px" }} size="small">
        <InputLabel id="demo-select-small-label  " error={error}>{label}</InputLabel>
        <Select
          labelId="demo-select-small-label"
          id="demo-select-small"
          value={value}
          label={label}
          onChange={handleChange}
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
