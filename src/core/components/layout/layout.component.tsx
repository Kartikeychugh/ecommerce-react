import {
  CheckoutPage,
  HomePage,
  ShopPage,
  SignInAndSignUpPage,
} from "../../../pages";
import { Header, WithSpinner } from "../../../components";
import { Redirect, Route, Switch } from "react-router-dom";

import { selectUser } from "../../redux";
import { useSelector } from "react-redux";

export const Layout = () => {
  const user = useSelector(selectUser);

  return (
    <WithSpinner
      isLoading={user === undefined}
      render={() => (
        <>
          <Header />
          <Switch>
            <Route exact={true} path="/checkout" component={CheckoutPage} />
            <Route exact={true} path="/" component={HomePage} />
            <Route path="/shop" component={ShopPage} />
            <Route exact={true} path="/checkout" component={CheckoutPage} />
            <Route exact={true} path="/signin">
              {user !== null ? <Redirect to="/" /> : <SignInAndSignUpPage />}
            </Route>
            <Route path="*" component={() => <div>404</div>} />
          </Switch>
        </>
      )}
    />
  );
};
