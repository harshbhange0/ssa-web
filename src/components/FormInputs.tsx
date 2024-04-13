import { Box, Button, TextField, Typography } from "@mui/material";
import { InputsProps } from "../types/form_types";
import SignLink from "./SignLink";

const FormInputs = ({
  type,
  onClick,
  title,
  email,
  name,
  setEmail,
  setName,
  error,
  loading,
  setAuthKey,
  authKey,
}: InputsProps) => {
  return (
    <Box
      onSubmit={onClick}
      component={"form"}
      className="max-w-md"
      sx={{
        display: "flex",
        gap: 2,
        mt: 5,
        mx: "auto",
        flexDirection: "column",
        p: 2,
      }}
    >
      <Typography
        variant="h3"
        gutterBottom
        className="w-full text-center capitalize"
      >
        {title}{" "}
        {type.toString().split("-")[0] + " " + type.toString().split("-")[1]}
      </Typography>
      <TextField
        type="email"
        required
        id="outlined-required"
        label="Email"
        autoComplete="off"
        value={email}
        onChange={setEmail}
        error={error}
      />
      {type == "sign-up" && (
        <TextField
          type="text"
          required
          id="outlined-required"
          autoComplete="off"
          label="name"
          value={name}
          onChange={setName}
          error={error}
        />
      )}
      <TextField
        type="password"
        required
        id="outlined-required"
        autoComplete="off"
        label="Auth Key"
        value={authKey}
        onChange={setAuthKey}
        error={error}
      />
      <Button
        type="submit"
        variant="outlined"
        disabled={loading}
        sx={{ mx: "auto", px: 3, pt: 1 }}
      >
        {type == "sign-in" ? "Sign In" : "Sign Up"}
      </Button>
      <div>
        <SignLink type={type} />
      </div>
    </Box>
  );
};

export default FormInputs;
