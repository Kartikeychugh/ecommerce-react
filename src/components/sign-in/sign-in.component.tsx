import "./sign-in.styles.scss";

import { Button, Input } from "../../core/ui";

import { FirebaseActions } from "../../core/redux/reducers/firebase/firebase.actions";
import React from "react";
import { connect } from "react-redux";

interface SignInOwnProps {
  signInWithGooglePopup: () => void;
  signInWithEmailAndPassword: (email: string, password: string) => void;
}

type SignInState = {
  email: string;
  password: string;
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
};
type SignInProps = SignInOwnProps;

class SignInInternal extends React.Component<SignInProps, SignInState> {
  constructor(props: SignInProps) {
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
            this.signInWithEmalAndPassword();
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
                this.signWithGoogle();
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

    this.setState({ [name]: value });
  };

  private signInWithEmalAndPassword = async () => {
    const { email, password } = this.state;

    try {
      await this.props.signInWithEmailAndPassword(email, password);
    } catch (e) {
      console.log(e);
    }
  };

  private signWithGoogle = async () => {
    try {
      this.props.signInWithGooglePopup();
    } catch (e) {
      console.log(e);
    }
  };
}

export const SignIn = connect(null, (dispatch) => {
  const { signInWithGooglePopup, signInWithEmailAndPassword } =
    FirebaseActions(dispatch);

  return {
    signInWithGooglePopup,
    signInWithEmailAndPassword,
  };
})(SignInInternal);
