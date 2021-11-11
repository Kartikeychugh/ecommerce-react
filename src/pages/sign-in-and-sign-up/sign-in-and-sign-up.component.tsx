import "./sign-in-and-sign-up.styles.scss";

import { SignIn, SignUp } from "../../components";

interface ISignInAndSignUpPageProps {}

export const SignInAndSignUpPage = (_props: ISignInAndSignUpPageProps) => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};
