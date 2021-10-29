import React from "react";
import { Location, History } from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { updateUserProfileDocument } from "../../services/db";

import { Input, Button } from "./../../core/ui";
import { createUserWithEmailAndPassword } from "./../../services/email-authentication";

import "./sign-up.styles.scss";
import { updateProfile } from "@firebase/auth";

type SignUpProps = {
  exitSignInPage: (
    location: Location<{
      navType: string;
    }>,
    history: History<{
      navType: string;
    }>
  ) => void;
} & RouteComponentProps<{}, {}, { navType: string }>;

type SignUpState = {
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
} & {
  displayName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

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
        <form className="sign-up-form" onSubmit={this.signUp}>
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

  private signUp = async (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    const { email, password, displayName, confirmPassword } = this.state;

    if (password !== confirmPassword) {
      return;
    }

    try {
      const { user } = await createUserWithEmailAndPassword(
        email,
        password,
        displayName
      );

      await updateUserProfileDocument(user, {
        displayName: user.displayName,
        email: user.email,
        createdAt: new Date(),
      });

      await updateProfile(user, { displayName });

      this.setState(
        {
          displayName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        () => {
          this.props.exitSignInPage(this.props.location, this.props.history);
        }
      );
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

export const SignUp = withRouter(SignUpInternal);
