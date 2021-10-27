import React from "react";
import { Button, Input } from "../../ui";
import "./sign-in.styles.scss";

interface ISignInProps {}

interface ISignInState {
  email: string;
  password: string;
  /** To handle allowing update from onChange event directly using name and value */
  [key: string]: string;
}

export class SignIn extends React.Component<ISignInProps, ISignInState> {
  constructor(props: ISignInProps) {
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

          <Button type="submit">Submit Form</Button>
        </form>
      </div>
    );
  }

  private handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log(this.state);
  };

  private handleChange = (e: React.SyntheticEvent<HTMLInputElement>) => {
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;

    this.setState({ [name]: value });
  };
}
