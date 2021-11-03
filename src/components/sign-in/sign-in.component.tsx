import "./sign-in.styles.scss";

import { Button, Input } from "../../core/ui";
import { History, Location } from "history";
import { RouteComponentProps, withRouter } from "react-router-dom";

import React from "react";
import { signInWithEmailAndPassword } from "../../services/email-authentication";
import { signInWithGooglePopUp } from "../../services/google-authentication";

type SignInProps = RouteComponentProps<{}, {}, { navType: string }> & {
  exitSignInPage: (
    location: Location<{
      navType: string;
    }>,
    history: History<{
      navType: string;
    }>
  ) => void;
};

type SignInState = {
  email: string;
  password: string;
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
};

class SignInInternal extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
    super(props);

    this.state = {
      password: "",
      email: "",
    };
  }

  public componentDidMount() {}

  public render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.signInWithEmalAndPassword}>
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
              onClick={this.signWithGoogle}>
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

    this.setState({ [name]: value });
  };

  private signInWithEmalAndPassword = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const { email, password } = this.state;

    try {
      await signInWithEmailAndPassword(email, password);
      this.setState({ password: "", email: "" }, () => {
        this.props.exitSignInPage(this.props.location, this.props.history);
      });
    } catch (e) {
      console.log(e);
    }
  };

  private signWithGoogle = async (
    event: React.SyntheticEvent<HTMLButtonElement>
  ) => {
    event.stopPropagation();
    const { location, history } = this.props;

    try {
      await signInWithGooglePopUp();
      this.props.exitSignInPage(location, history);
    } catch (e) {
      console.log(e);
    }
  };
}

export const SignIn = withRouter(SignInInternal);
