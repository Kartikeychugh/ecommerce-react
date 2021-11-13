import { Firebase, FirebaseContext } from "../contexts";

export const FirebaseConsumer = Firebase.Consumer;

export interface WithFirebaseProps extends FirebaseContext {}

export const withFirebase = <P,>(
  WrappedComponent: React.ComponentType<P & WithFirebaseProps>
) => {
  return (props: P) => (
    <FirebaseConsumer>
      {(FirebaseConsumerProps) => {
        return <WrappedComponent {...props} {...FirebaseConsumerProps} />;
      }}
    </FirebaseConsumer>
  );
};
