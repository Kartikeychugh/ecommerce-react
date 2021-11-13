import "./sign-in.styles.scss";

import { Button, Input } from "../../core/ui";
import { WithFirebaseAuthProps, withFirebaseAuth } from "../../core/firebase";

import React from "react";

interface SignInProps {}

type SignInState = {
  email: string;
  password: string;
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
};

class SignInInternal extends React.Component<
  SignInProps & WithFirebaseAuthProps,
  SignInState
> {
  constructor(props: SignInProps & WithFirebaseAuthProps) {
    super(props);

    this.state = {
      password: "",
      email: "",
    };
  }

  public render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form
          onSubmit={(event: React.SyntheticEvent) => {
            event.preventDefault();
            this.signInWithEmalAndPassword(
              this.props.signInWithEmailAndPassword
            );
          }}>
          <Input
            name="email"
            type="email"
            required={true}
            value={this.state.email}
            onChange={this.handleChange}
            label={"Email"}
          />
          <Input
            name="password"
            type="password"
            required={true}
            value={this.state.password}
            onChange={this.handleChange}
            label={"Password"}
          />
          <div className="button">
            <Button type="submit">Sign In</Button>
            <Button
              googleButton={true}
              type="button"
              onClick={(event: React.SyntheticEvent<HTMLButtonElement>) => {
                event.preventDefault();
                this.signWithGoogle(this.props.signInWithGooglePopup);
              }}>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    );
  }

  private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    console.log("Updating state:", "signin");

    this.setState({ [name]: value });
  };

  private signInWithEmalAndPassword = async (
    signInWithEmailAndPassword: WithFirebaseAuthProps["signInWithEmailAndPassword"]
  ) => {
    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(email, password);
      console.log("Updating state:", "signin");

      this.setState({ password: "", email: "" });
    } catch (e) {
      console.log(e);
    }
  };

  private signWithGoogle = async (
    signInWithGooglePopup: WithFirebaseAuthProps["signInWithGooglePopup"]
  ) => {
    try {
      await signInWithGooglePopup();
    } catch (e) {
      console.log(e);
    }
  };
}

export const SignIn = withFirebaseAuth(SignInInternal);
