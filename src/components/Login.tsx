import React from "react";
import Button from "components/shared/Button/Button";
import LoginInput from "./Login/LoginInput";
import { Navigate, useNavigate } from "react-router-dom";
import { IUser } from "interface";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "state";
import { State } from "state/reducers";
import "./Login/login.css";

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
    // after one second router will redirects to home page
    // one second is fake loading space
    login(user, () => {
      navigate("/");
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData({
      ...formData,
      // Trimming any whitespace
      [e.target.name]: e.target.value.trim(),
    });
  };
  return (
    <div className="loginWrapper">
      <form className="loginForm" onSubmit={onSubmit}>
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
        <Button style={{ marginTop: 16 }} type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default Login;
