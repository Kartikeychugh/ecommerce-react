import { Location, History } from "history";

import { SignIn, SignUp } from "../../components";
import "./sign-in-and-sign-up.styles.scss";

interface ISignInAndSignUpPageProps {}

export const SignInAndSignUpPage = (_props: ISignInAndSignUpPageProps) => {
  const exitSignInPage = (
    location: Location<{
      navType: string;
    }>,
    history: History<{
      navType: string;
    }>
  ) => {
    const next = location?.state?.navType;
    if (next === "inApp") {
      history.goBack();
    } else {
      history.push("/");
    }
  };

  return (
    <div className="sign-in-and-sign-up">
      <SignIn exitSignInPage={exitSignInPage} />
      <SignUp exitSignInPage={exitSignInPage} />
    </div>
  );
};
