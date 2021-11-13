import {
  CheckoutPage,
  HomePage,
  ShopPage,
  SignInAndSignUpPage,
} from "../../../pages";
import { Redirect, Route, Switch } from "react-router-dom";
import { WithFirebaseUserProps, withFirebaseUser } from "../../firebase";

import { Header } from "../../../components";
import React from "react";
import { WithSpinner } from "../../../components/with-spinner/with-spinner.component";

type LayoutState = {};
interface LayoutProps {}

class LayoutInternal extends React.Component<
  LayoutProps & WithFirebaseUserProps,
  LayoutState
> {
  public render() {
    return (
      <WithSpinner
        isLoading={this.props.user === undefined}
        render={() => (
          <>
            <Header />
            <Switch>
              <Route exact={true} path="/checkout" component={CheckoutPage} />
              <Route exact={true} path="/" component={HomePage} />
              <Route path="/shop" component={ShopPage} />
              <Route exact={true} path="/checkout" component={CheckoutPage} />
              <Route exact={true} path="/signin">
                {this.props.user !== null ? (
                  <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )}
              </Route>
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </>
        )}
      />
    );
  }
}

export const Layout = withFirebaseUser(LayoutInternal);
