import "./sign-in.styles.scss";

import { Button, Input } from "../../core/ui";
import React, { useState } from "react";
import { RootState, useFirebaseAction } from "../../core";

import { selectLogging } from "../../core/redux/reducers/user/user.selectors";
import { useSelector } from "react-redux";

type SignInState = {
  email: string;
  password: string;
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
};

export const SignIn = () => {
  const [passwordAndEmail, setPasswordAndEmail] = useState<SignInState>({
    password: "",
    email: "",
  });

  const { signInWithEmailAndPassword, signInWithGooglePopup } =
    useFirebaseAction();
  const logging = useSelector((state: RootState) => selectLogging(state));
  const handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    setPasswordAndEmail({ ...passwordAndEmail, [name]: value });
  };

  async function signInWithEmalAndPassword() {
    try {
      await signInWithEmailAndPassword(
        passwordAndEmail.email,
        passwordAndEmail.password
      );
    } catch (e) {
      console.log(e);
    }
  }

  const signWithGoogle = async () => {
    try {
      signInWithGooglePopup();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email and password</span>

      <form
        onSubmit={(event: React.SyntheticEvent) => {
          event.preventDefault();
          signInWithEmalAndPassword();
        }}>
        <Input
          name="email"
          type="email"
          required={true}
          value={passwordAndEmail.email}
          onChange={handleChange}
          label={"Email"}
        />
        <Input
          name="password"
          type="password"
          required={true}
          value={passwordAndEmail.password}
          onChange={handleChange}
          label={"Password"}
        />
        <div className="button">
          <Button disabled={logging} type="submit">
            Sign In
          </Button>
          <Button
            disabled={logging}
            googleButton={true}
            type="button"
            onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
              event.preventDefault();
              signWithGoogle();
            }}>
            Sign in with Google
          </Button>
        </div>
      </form>
    </div>
  );
};
