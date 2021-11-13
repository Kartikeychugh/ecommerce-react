import "./sign-up.styles.scss";

import { Button, Input } from "./../../core/ui";
import { WithFirebaseAuthProps, withFirebaseAuth } from "../../core/firebase";

import React from "react";

interface SignUpProps {}

interface SignUpState {
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

class SignUpInternal extends React.Component<
  SignUpProps & WithFirebaseAuthProps,
  SignUpState
> {
  constructor(props: SignUpProps & WithFirebaseAuthProps) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  public render() {
    return (
      <div className="sign-up">
        <h2 className="title">I do not have a account</h2>
        <span>Sign up with your email and password</span>
        <form
          className="sign-up-form"
          onSubmit={(event: React.SyntheticEvent<HTMLFormElement>) => {
            event.preventDefault();
            this.signUp(this.props.createUserWithEmailAndPassword);
          }}>
          <Input
            type="text"
            name="displayName"
            value={this.state.displayName}
            onChange={this.handleChange}
            label="Name"
            required={true}
          />
          <Input
            type="email"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            label="email"
            required={true}
          />
          <Input
            type="password"
            name="password"
            value={this.state.password}
            onChange={this.handleChange}
            label="Password"
            required={true}
          />
          <Input
            type="password"
            name="confirmPassword"
            value={this.state.confirmPassword}
            onChange={this.handleChange}
            label="Confirm password"
            required={true}
          />
          <Button type="submit">SIGN UP</Button>
        </form>
      </div>
    );
  }

  private signUp = async (
    createUserWithEmailAndPassword: WithFirebaseAuthProps["createUserWithEmailAndPassword"]
  ) => {
    const { email, password, displayName, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      return;
    }

    try {
      await createUserWithEmailAndPassword(email, password, displayName);
    } catch (e) {
      console.log(e);
    }
  };

  private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    console.log("Updating state:", "signup");

    this.setState({ [name]: value });
  };
}

export const SignUp = withFirebaseAuth(SignUpInternal);
