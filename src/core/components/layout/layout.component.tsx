import {
  CheckoutPage,
  HomePage,
  ShopPage,
  SignInAndSignUpPage,
} from "../../../pages";
import { Header, WithSpinner } from "../../../components";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState, selectUser } from "../../redux";

import { CurrentUser } from "../../firebase";
import React from "react";
import { connect } from "react-redux";

interface LayoutOwnProps {
  user: CurrentUser;
}

type LayoutState = {};
type LayoutProps = LayoutOwnProps;

class LayoutInternal extends React.Component<LayoutProps, LayoutState> {
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

export const Layout = connect((state: RootState) => {
  return {
    user: selectUser(state),
  };
})(LayoutInternal);
