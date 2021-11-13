import {
  DocumentData,
  DocumentReference,
  DocumentSnapshot,
  Firestore,
  doc,
  onSnapshot,
} from "@firebase/firestore";
import { Firebase, FirebaseUser, FirebaseUserContext } from "../contexts";
import { Unsubscribe, onAuthStateChanged } from "@firebase/auth";

import React from "react";
import { User } from "../firebase.types";

const subscribeToChanges = <DocumentData,>(
  docRef: DocumentReference<DocumentData>,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  return onSnapshot(docRef, callback);
};

const subscribeToUserProfile = (
  store: Firestore,
  user: User,
  callback: (snapshot: DocumentSnapshot<DocumentData>) => void
) => {
  const docRef = doc(store, `users/${user.uid}`);
  return subscribeToChanges<DocumentData>(docRef, callback);
};

interface FirebaseUserProviderProps {}
interface FirebaseUserProviderState extends FirebaseUserContext {}
export class FirebaseUserProvider extends React.Component<
  FirebaseUserProviderProps,
  FirebaseUserProviderState
> {
  private unsubscribe: Unsubscribe | undefined;
  static contextType = Firebase;

  constructor(props: FirebaseUserProviderProps) {
    super(props);
    this.state = {
      user: undefined,
    };
  }

  componentDidMount() {
    onAuthStateChanged(this.context.firebaseAuth, (user) => {
      if (user) {
        /**
         * When the profile gets updated in backend only then try to
         * complete the sign-in
         */
        this.unsubscribe = subscribeToUserProfile(
          this.context.firebaseStore,
          user,
          (snapShot: DocumentSnapshot<DocumentData>) => {
            const user = snapShot.data();
            if (user && user.email && user.displayName) {
              this.setState({
                user: {
                  id: snapShot.id,
                  email: user.email,
                  displayName: user.displayName,
                  createdAt: user.createdAt,
                },
              });
            }
          }
        );
      } else {
        this.setState({ user });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribe && this.unsubscribe();
  }

  render() {
    return (
      <FirebaseUser.Provider value={{ user: this.state.user }}>
        {this.props.children}
      </FirebaseUser.Provider>
    );
  }
}
