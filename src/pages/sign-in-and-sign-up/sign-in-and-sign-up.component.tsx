import { SignIn } from "../../components";
import "./sign-in-and-sign-up.styles.scss";

interface ISignInAndSignUpPageProps {}
export const SignInAndSignUpPage = (props: ISignInAndSignUpPageProps) => {
  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
    </div>
  );
};
