import { SignIn } from "../../components";
import { IUser } from "../../models";
import "./sign-in-and-sign-up.styles.scss";

interface ISignInAndSignUpPageProps {}

export const SignInAndSignUpPage = (props: ISignInAndSignUpPageProps) => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
    </div>
  );
};
