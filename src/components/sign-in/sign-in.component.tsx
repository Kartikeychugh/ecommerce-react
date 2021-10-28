import React from "react";
import { RouteComponentProps, withRouter } from "react-router-dom";
import { Auth } from "../../core/firebase";
import { Button, Input } from "../../core/ui";
import { IUser } from "../../models";
import "./sign-in.styles.scss";

type SignInProps = RouteComponentProps<{}, {}, { navType: string }> & {};

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

        <form onSubmit={this.handleSubmit}>
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
            <Button type="submit">Submit Form</Button>
            <Button
              className="google-sign-in"
              type="button"
              onClick={this.signin}>
              Sign in with Google
            </Button>
          </div>
        </form>
      </div>
    );
  }

  private handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
  };

  private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState({ [name]: value });
  };

  private signin = () => {
    Auth.loginWithGoogle()
      .then(() => {
        const next = this.props.location?.state?.navType;
        if (next) {
          this.props.history.push(next);
        } else {
          this.props.history.push("/");
        }
      })
      .catch(() => {
        console.log("Login failed");
      });
  };
}

export const SignIn = withRouter(SignInInternal);
