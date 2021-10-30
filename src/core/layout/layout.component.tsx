import { CartDropdown, Header } from "../../components";
import { HomePage, ShopPage, SignInAndSignUpPage } from "../../pages";
import { Redirect, Route, Switch } from "react-router-dom";

import { CurrentUser } from "../../models";
import React from "react";
import { RootState } from "../redux";
import { connect } from "react-redux";

type LayoutState = {};
type LayoutProps = {
  cartOpen: boolean;
  currentUser: CurrentUser;
};

class LayoutInternal extends React.Component<LayoutProps, LayoutState> {
  private routes: {
    exact?: boolean;
    path: string;
    component: () => JSX.Element;
  }[];

  constructor(props: LayoutProps) {
    super(props);

    this.routes = [
      {
        exact: true,
        path: "/",
        component: () => <HomePage />,
      },
      { exact: true, path: "/shop", component: () => <ShopPage /> },
      {
        exact: true,
        path: "/signin",
        component: () => <SignInAndSignUpPage />,
      },
    ];
  }

  public render() {
    switch (this.props.currentUser) {
      case undefined:
        return "Loading...";
      case null:
      default:
        return (
          <>
            <Header />
            {this.props.cartOpen ? <CartDropdown /> : null}
            <Switch>
              <Route exact={true} path="/" component={HomePage} />
              <Route exact={true} path="/shop" component={ShopPage} />
              <Route exact={true} path="/signin">
                {this.props.currentUser !== null ? (
                  <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )}
              </Route>
              <Route path="*" component={() => <div>404</div>} />
              {this.routes.map((route, i) => (
                <Route
                  key={i}
                  exact={route.exact}
                  path={route.path}
                  component={route.component}
                />
              ))}
            </Switch>
          </>
        );
    }
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    currentUser: state.user.currentUser,
    cartOpen: state.cart.cartOpen,
  };
};

export const Layout = connect(mapStateToProps)(LayoutInternal);
