import { Link } from "react-router-dom";
import { Crown } from "../../assests";
import "./header.styles.scss";
import { firestoreAPI, User } from "../../core/firebase";

type HeaderProps = { currentUser: User | null };

export const Header = (props: HeaderProps) => {
  const { currentUser } = props;
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Crown className="logo" />
      </Link>

      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
        <Link className="option" to="/shop">
          CONTACT
        </Link>

        {currentUser ? (
          <div className="option" onClick={() => firestoreAPI.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};
