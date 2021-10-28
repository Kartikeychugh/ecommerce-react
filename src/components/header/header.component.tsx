import { Link } from "react-router-dom";
import { Crown } from "../../assests";
import "./header.styles.scss";
import { Auth } from "../../core/firebase";
import { IUser } from "../../models";

type HeaderProps = {
  currentUser: IUser | null;
};

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
          <div className="option" onClick={() => Auth.signOut()}>
            SIGN OUT
          </div>
        ) : (
          <Link
            className="option"
            to={{ pathname: "/signin", state: { navType: "/shop" } }}>
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  );
};
