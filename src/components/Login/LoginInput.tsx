import React, { FC } from "react";
import "./login.css";

type ILoginInputProps = {
  label: string;
} & React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const LoginInput: FC<ILoginInputProps> = (props) => {
  const { label, ...rest } = props;

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
    <div className="loginInputWrapper">
      <label
        className={`loginInputLabel ${error ? "error" : ""}`}
        htmlFor="username"
      >
        {label}:
      </label>
      <input
        {...rest}
        className={`loginInput ${error ? "error" : ""}`}
        onInvalid={handleInvalid}
        onChange={handleChange}
      />
      {error && <span className="loginInputError">* {error}</span>}
    </div>
  );
};

export default LoginInput;
