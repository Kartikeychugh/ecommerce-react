import "./sign-up.styles.scss";

import { Button, Input } from "./../../core/ui";
import React, { useState } from "react";

import { useFirebaseAction } from "../../core";

type SignUpState = {
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignUp = () => {
  const [state, setState] = useState<SignUpState>({
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { createUserWithEmailAndPassword } = useFirebaseAction();

  const signUp = async () => {
    const { email, password, displayName, confirmPassword } = state;

    if (password !== confirmPassword) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(email, password, displayName);

      setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setState({ ...state, [name]: value });
  };

  return (
    <div className="sign-up">
      <h2 className="title">I do not have a account</h2>
      <span>Sign up with your email and password</span>
      <form
        className="sign-up-form"
        onSubmit={(event: React.SyntheticEvent<HTMLFormElement>) => {
          event.preventDefault();
          signUp();
        }}>
        <Input
          type="text"
          name="displayName"
          value={state.displayName}
          onChange={handleChange}
          label="Name"
          required={true}
        />
        <Input
          type="email"
          name="email"
          value={state.email}
          onChange={handleChange}
          label="email"
          required={true}
        />
        <Input
          type="password"
          name="password"
          value={state.password}
          onChange={handleChange}
          label="Password"
          required={true}
        />
        <Input
          type="password"
          name="confirmPassword"
          value={state.confirmPassword}
          onChange={handleChange}
          label="Confirm password"
          required={true}
        />
        <Button type="submit">SIGN UP</Button>
      </form>
    </div>
  );
};
