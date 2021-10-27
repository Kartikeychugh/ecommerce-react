import React, { ChangeEventHandler } from "react";
import { AllOrNone } from "../utils";
import "./input.styles.scss";

interface IBasicInputProps {
  required?: boolean;
  name?: string;
  type?: string;
  label?: string;
}

type ControlledInputProps = AllOrNone<{
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}>;

type IInputProps = ControlledInputProps & IBasicInputProps;

export const Input = React.forwardRef<HTMLInputElement, IInputProps>(
  (props: IInputProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    const { name, required = false, value, onChange, type, label } = props;
    return (
      <div className="group">
        <input
          className="form-input"
          {...(ref ? { ref } : {})}
          {...(name ? { name } : {})}
          {...(value !== undefined ? { value } : {})}
          {...(onChange ? { onChange } : {})}
          {...(type ? { type } : {})}
          {...(required ? { required } : {})}
        />
        {label ? (
          <label
            className={`${
              value && value.length > 0 ? "shrink " : ""
            }form-input-label`}
            {...(name ? { htmlFor: name } : {})}>
            {label}
          </label>
        ) : null}
      </div>
    );
  }
);
