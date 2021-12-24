// import "./input.styles.scss";

import { FormInput, InputGroup, InputLabel } from "./input.styles";
import React, { ChangeEventHandler } from "react";

import { AllOrNone } from "../utils";

interface ICustomInputProps {
  label?: string;
}

type ReactControlledInputProps = AllOrNone<{
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}>;

type IInputProps = ReactControlledInputProps &
  Partial<HTMLInputElement> &
  ICustomInputProps;

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (props: IInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, required = false, value, onChange, type, label } = props;
    return (
      <InputGroup>
        <FormInput
          {...(ref ? { ref } : {})}
          {...(name ? { name } : {})}
          {...(value !== undefined ? { value } : {})}
          {...(onChange ? { onChange } : {})}
          {...(type ? { type } : {})}
          {...(required ? { required } : {})}
          {...{ autoComplete: getAuthCompleteAttrValue(type) }}
        />
        {label ? (
          <InputLabel
            className={`${
              value && value.length > 0 ? "shrink " : ""
            }form-input-label`}
            {...(name ? { htmlFor: name } : {})}>
            {label}
          </InputLabel>
        ) : null}
      </InputGroup>
    );
  }
);

const getAuthCompleteAttrValue = (type?: string) => {
  switch (type) {
    case "password":
      return "current-password";
    case "email":
      return "username";
    default:
      return "";
  }
};
