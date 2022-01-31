import { useCallback, useReducer } from "react";

interface IInputType {
  value: string;
  isValid: boolean;
}

export interface IInputs {
  [key: string]: IInputType;
}

export interface IFormState {
  inputs: IInputs;
  isValid: boolean;
}

const formInitialState: IFormState = {
  inputs: {
    email: {
      value: "",
      isValid: false,
    },
  },
  isValid: false,
};

const formReducer = (
  state = formInitialState,
  action: { type: string; payload?: any }
) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputName in state.inputs) {
        if (!state.inputs[inputName]) {
          continue;
        }
        if (inputName === action.payload.inputName) {
          formIsValid = formIsValid && action.payload.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputName].isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.payload.inputName]: {
            value: action.payload.value,
            isValid: action.payload.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_DATA":
      return {
        inputs: action.payload.inputs,
        isValid: action.payload.formIsValid,
      };
    default:
      return state;
  }
};

const useForm = (
  initialInputs: IInputs,
  initialFormValidity: boolean
): {
  formState: IFormState;
  inputHandler: (name: string, value: any, isValid: boolean) => void;
  setFormData: (inputData: any, formValidity: any) => void;
} => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const inputHandler = useCallback(
    (name: string, value: any, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        payload: {
          value: value,
          isValid: isValid,
          inputName: name,
        },
      });
    },
    []
  );

  const setFormData = useCallback((inputData, formValidity) => {
    dispatch({
      type: "SET_DATA",
      payload: {
        inputs: inputData,
        formIsValid: formValidity,
      },
    });
  }, []);

  return { formState, inputHandler, setFormData };
};

export default useForm;
