import React from "react";
import { Route, Switch } from "react-router-dom";

import { firestoreAPI, User, Unsubscribe } from "./core/firebase";

import { Header } from "./components";
import { HomePage, ShopPage, SignInAndSignUpPage } from "./pages";

type AppState = { currentUser: User | null | undefined };

export class App extends React.Component<{}, AppState> {
  private unsubscribeAuth: Unsubscribe | undefined;

  constructor(props: {}) {
    super(props);
    this.unsubscribeAuth = undefined;
    this.state = {
      currentUser: undefined,
    };
  }

  public componentDidMount() {
    this.unsubscribeAuth = firestoreAPI.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ currentUser: user });
        console.log("Signed in");
      } else {
        this.setState({ currentUser: user });
        console.log("Signed out");
      }
    });
  }

  public componentWillUnmount() {
    this.unsubscribeAuth && this.unsubscribeAuth();
  }

  public render() {
    return this.getUI();
  }

  private getUI() {
    switch (this.state.currentUser) {
      case undefined:
        return "Loading...";
      case null:
      default:
        return (
          <>
            <Header currentUser={this.state.currentUser} />
            <Switch>
              <Route exact path="/" component={HomePage} />
              <Route exact path="/shop" component={ShopPage} />
              <Route exact path="/signin" component={SignInAndSignUpPage} />
            </Switch>
          </>
        );
    }
  }
}
