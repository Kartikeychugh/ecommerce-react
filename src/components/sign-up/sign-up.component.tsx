import "./sign-up.styles.scss";

import { Button, Input } from "./../../core/ui";

import { FirebaseActions } from "../../core/redux/reducers/firebase/firebase.actions";
import React from "react";
import { connect } from "react-redux";

interface SignUpOwnProps {
  createUserWithEmailAndPassword: (
    email: string,
    password: string,
    displayName: string
  ) => void;
}

type SignUpState = {
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

type SignUpProps = SignUpOwnProps;

class SignUpInternal extends React.Component<SignUpProps, SignUpState> {
  constructor(props: SignUpProps) {
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
            this.signUp();
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

  private signUp = async () => {
    const { email, password, displayName, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      return;
    }

    try {
      await this.props.createUserWithEmailAndPassword(
        email,
        password,
        displayName
      );

      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (e) {
      console.log(e);
    }
  };

  private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState({ [name]: value });
  };
}

export const SignUp = connect(null, (dispatch: any) => {
  return {
    createUserWithEmailAndPassword:
      FirebaseActions(dispatch).createUserWithEmailAndPassword,
  };
})(SignUpInternal);
