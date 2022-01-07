import "./sign-in-and-sign-up.styles.scss";

import { SignIn, SignUp } from "../../components";

import { selectUser } from "../../core/redux";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";

interface ISignInAndSignUpPageProps {}

export const SignInAndSignUpPage = (_props: ISignInAndSignUpPageProps) => {
  const user = useSelector(selectUser);
  const history = useHistory();

  if (user) {
    history.goBack();
  }

  return (
    <div className="sign-in-and-sign-up">
      <SignIn />
      <SignUp />
    </div>
  );
};
