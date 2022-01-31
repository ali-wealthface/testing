import React, { useReducer, useEffect } from "react";
import { validate } from "../../../utils/validators";
import "./InputElement.style.scss";

interface IInputProps {
  id?: string;
  label?: string;
  type?: React.HTMLInputTypeAttribute;
  name: string;
  placeholder?: string;
  errorMessage?: string;
  validators?: { type: string }[];
  onInput: (name: string, value: any, isValid: boolean) => void;
}

const InputElement: React.FC<IInputProps> = ({
  id,
  label,
  onInput,
  name,
  placeholder,
  type = "text",
  errorMessage = "There is some error",
  validators = [],
}) => {
  const [inputState, dispatch] = useReducer(inputReducer, INITIAL_STATE);

  const handleOnChange = (event: any) => {
    dispatch({
      type: "CHANGE",
      payload: { value: event.target.value, validators },
    });
  };

  const handleOnBlur = () => {
    dispatch({ type: "TOUCHED" });
  };

  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(name, value, isValid);
  }, [name, value, isValid, onInput]);

  return (
    <div
      className={`form-control ${
        !inputState.isValid && inputState.isTouched && "form-control__invalid"
      }`}
    >
      {/* {!!label && <label htmlFor={id}>{label}</label>} */}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        id={id}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        value={inputState.value}
      />
      {!inputState.isValid && inputState.isTouched && (
        <span className="help-text">{errorMessage}</span>
      )}
    </div>
  );
};

export default InputElement;

interface IInputAction {
  type: string;
  payload?: any;
}

interface IInputState {
  value: string | number;
  isValid: boolean;
  isTouched: boolean;
}
const INITIAL_STATE: IInputState = {
  value: "",
  isValid: false,
  isTouched: false,
};

const inputReducer = (state = INITIAL_STATE, action: IInputAction) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.payload.value,
        isValid: validate(action.payload.value, action.payload.validators),
      };
    case "TOUCHED":
      return {
        ...state,
        isTouched: true,
      };

    default:
      return state;
  }
};
