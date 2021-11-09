import {
  CheckoutPage,
  HomePage,
  ShopPage,
  SignInAndSignUpPage,
} from "../../../pages";
import { Redirect, Route, Switch } from "react-router-dom";
import { RootState, selectCartOpenState, selectCurrentUser } from "../../redux";

import { CurrentUser } from "../../../models";
import { Header } from "../../../components";
import React from "react";
import { WithSpinner } from "../../../components/with-spinner/with-spinner.component";
import { connect } from "react-redux";

type LayoutState = {};
type LayoutProps = {
  cartOpen: boolean;
  currentUser: CurrentUser;
};

class LayoutInternal extends React.Component<LayoutProps, LayoutState> {
  public render() {
    return (
      <WithSpinner isLoading={this.props.currentUser === undefined}>
        <Header />
        <Switch>
          <Route exact={true} path="/checkout" component={CheckoutPage} />
          <Route exact={true} path="/" component={HomePage} />
          <Route path="/shop" component={ShopPage} />
          <Route exact={true} path="/checkout" component={CheckoutPage} />
          <Route exact={true} path="/signin">
            {this.props.currentUser !== null ? (
              <Redirect to="/" />
            ) : (
              <SignInAndSignUpPage />
            )}
          </Route>
          {/* <Route path="*" component={() => <div>404</div>} /> */}
        </Switch>
      </WithSpinner>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: selectCurrentUser(state),
    cartOpen: selectCartOpenState(state),
  };
};

export const Layout = connect(mapStateToProps)(LayoutInternal);
