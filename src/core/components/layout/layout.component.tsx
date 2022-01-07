import {
  CheckoutPage,
  HomePage,
  ShopPage,
  SignInAndSignUpPage,
} from "../../../pages";
import { Route, Switch } from "react-router-dom";

import { Header } from "../../../components";

export const Layout = () => {
  return (
    <>
      <Header />
      <Switch>
        <Route exact={true} path="/checkout" component={CheckoutPage} />
        <Route exact={true} path="/" component={HomePage} />
        <Route path="/shop" component={ShopPage} />
        <Route exact={true} path="/checkout" component={CheckoutPage} />
        <Route exact={true} path="/signin" component={SignInAndSignUpPage} />
        <Route path="*" component={() => <div>404</div>} />
      </Switch>
    </>
  );
};
