import React from "react";
import {
  Route,
  Switch,
  withRouter,
  RouteComponentProps,
  Redirect,
} from "react-router-dom";

import { Auth, Unsubscribe, Store } from "./core/firebase";

import { Header } from "./components";
import { HomePage, ShopPage, SignInAndSignUpPage } from "./pages";
import { IUser } from "./models";
import { DocumentData, DocumentSnapshot } from "@firebase/firestore";

type AppState = { currentUser: IUser | null | undefined };
type AppProps = RouteComponentProps;

class AppInternal extends React.Component<AppProps, AppState> {
  private unsubscribeAuth: Unsubscribe | undefined;

  constructor(props: AppProps) {
    super(props);
    this.unsubscribeAuth = undefined;
    this.state = {
      currentUser: undefined,
    };
  }

  public componentDidMount() {
    this.unsubscribeAuth = Auth.onAuthStateChanged(async (userAuthDetails) => {
      if (userAuthDetails) {
        const docRef = await Store.createUserProfileDocument(userAuthDetails);
        Store.subscribeToDocRef(
          docRef,
          (docSnap: DocumentSnapshot<DocumentData>) => {
            const userData = docSnap.data() as Omit<IUser, "id">;
            this.setState({
              currentUser: {
                ...userData,
                id: docSnap.id,
              },
            });
          }
        );
      } else {
        this.setState({ currentUser: userAuthDetails });
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
              <Route exact path="/signin">
                {this.state.currentUser !== null ? (
                  <Redirect to="/" />
                ) : (
                  <SignInAndSignUpPage />
                )}
              </Route>
              <Route path="*" component={() => <div>404</div>} />
            </Switch>
          </>
        );
    }
  }
}

export const App = withRouter(AppInternal);
