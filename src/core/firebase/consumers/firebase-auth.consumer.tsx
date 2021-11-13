import { FirebaseAuth, FirebaseAuthContext } from "./../contexts";

export const FirebaseAuthConsumer = FirebaseAuth.Consumer;

export interface WithFirebaseAuthProps extends FirebaseAuthContext {}

export const withFirebaseAuth = <P,>(
  WrappedComponent: React.ComponentType<P & WithFirebaseAuthProps>
) => {
  return (props: P) => (
    <FirebaseAuthConsumer>
      {(firebaseAuthConsumerProps) => {
        return <WrappedComponent {...props} {...firebaseAuthConsumerProps} />;
      }}
    </FirebaseAuthConsumer>
  );
};
