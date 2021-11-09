import "./sign-in-and-sign-up.styles.scss";

import { History, Location } from "history";
import { SignIn, SignUp } from "../../components";

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
