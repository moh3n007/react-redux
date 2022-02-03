import { Box } from "@material-ui/core";
import React, { FC } from "react";
import { makeStyles } from "@material-ui/core/styles";

type ILoginInputProps = {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const LoginInput: FC<ILoginInputProps> = (props) => {
  const { label, ...rest } = props;
  const classes = useStyles();

  const [error, setError] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!!error) {
      setError("");
    }
    rest?.onChange?.(e);
  };

  const handleInvalid = (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    const value = e.currentTarget.value;
    const required = e.currentTarget.getAttribute("required");
    const minLength = e.currentTarget.getAttribute("minLength");

    if (required !== undefined && !value) {
      // check if value is empty
      setError("This field is required");
    } else if (!!minLength && value?.length < Number(minLength)) {
      // check if length of value in smaller than min length
      setError("At least 3 character");
    }
  };

  return (
    <Box display="flex" flexDirection="column">
      <label
        className={`${classes.label} ${error ? classes.labelError : ""}`}
        htmlFor="username"
      >
        {label}:
      </label>
      <input
        {...rest}
        className={`${classes.input} ${error ? classes.inputError : ""}`}
        onInvalid={handleInvalid}
        onChange={handleChange}
      />
      {error && <span className={classes.errorText}>* {error}</span>}
    </Box>
  );
};

const useStyles = makeStyles({
  label: {
    marginBottom: 10,
  },
  labelError: {
    color: "red",
  },
  input: {
    border: "1px solid #d2c6c6",
    borderRadius: 4,
    padding: 6,
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    marginTop: 6,
    color: "red",
    fontsize: "0.75rem",
  },
});

export default LoginInput;
