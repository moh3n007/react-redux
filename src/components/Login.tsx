import React, { useState } from "react";
import LoginInput from "./Login/LoginInput";
import { Navigate, useNavigate } from "react-router-dom";
import { IUser } from "interface";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { State } from "state/reducers";
import { Box, Button, Typography } from "@material-ui/core";

interface IFormDate {
  username: string;
  password: string;
}

const initialFormData: IFormDate = Object.freeze({
  username: "",
  password: "",
});

const Login = () => {
  const [formData, updateFormData] = React.useState(initialFormData);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { login } = bindActionCreators(actionCreators, dispatch);
  const user = useSelector((state: State) => state.user as IUser);

  if (!!user) {
    return <Navigate to="/" />;
  }

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const user: IUser = {
      username: formData.username,
      password: formData?.password,
    };
    if (checkUser(user)) {
      // after one second router will redirects to home page
      // one second is fake loading space
      login(user, () => {
        navigate("/");
      });
    } else {
      setError(true);
    }
  };

  const checkUser = (user: IUser) => {
    let isCorrect = true;
    if (user.username !== "mohsen" || user.password !== "lotfi") {
      isCorrect = false;
    }
    return isCorrect;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      height="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Box mb={3}>
        <Typography>
          fake user: <br />
          username: mohsen <br />
          password: lotfi
        </Typography>
      </Box>
      {error && (
        <Box color="red" mb={3}>
          * username or password is incorrect
        </Box>
      )}
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gridGap="16px"
        onSubmit={onSubmit}
      >
        <LoginInput
          label="Username"
          type="text"
          id="username"
          name="username"
          onChange={handleChange}
          minLength={3}
          required
        />
        <LoginInput
          label="Password"
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          required
          minLength={3}
        />
        <Box mt={2}>
          <Button fullWidth color="primary" variant="contained" type="submit">
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
