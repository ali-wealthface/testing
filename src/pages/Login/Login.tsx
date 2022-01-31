import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useLocation, Navigate } from "react-router-dom";
import Modal from "../../components/Layout/Modal/Modal";
import Button from "../../components/UiElements/Button/Button";
import InputElement from "../../components/UiElements/Input/InputElement";
import useForm from "../../hooks/useForm";
import { IAppState } from "../../store/store.interface";
import { AUTH_USER_LOGGED_IN } from "../../store/store.types";
import { VALIDATOR_EMAIL } from "../../utils/validators";

const formInitialSate = {
  email: {
    value: "",
    isValid: false,
  },
  password: {
    value: "",
    isValid: false,
  },
};

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { isLoggedIn } = useSelector((state: IAppState) => state.auth);
  const { formState, inputHandler } = useForm(formInitialSate, true);

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(formState.inputs);
    localStorage.setItem("app_token", JSON.stringify("a-valid-token"));
    dispatch({ type: AUTH_USER_LOGGED_IN });
    if (
      location &&
      location.state &&
      (location.state as any).from &&
      (location.state as any).from.pathname
    ) {
      navigate((location.state as any).from.pathname);
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  if (isLoggedIn) return <Navigate to="/" />;

  return (
    <div style={{ height: "10000px" }}>
      <Modal open={true}>
        <form className="login-form" onSubmit={handleSubmit}>
          <InputElement
            id="email"
            name="email"
            type="text"
            placeholder="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorMessage="Please enter a valid email"
            onInput={inputHandler}
          />
          <InputElement
            id="password"
            name="password"
            type="password"
            placeholder="Enter Password"
            errorMessage="Password is required"
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            Submit
          </Button>
        </form>
        <div className="navigation-text">
          or go back to <Link to="/">homepage</Link>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
