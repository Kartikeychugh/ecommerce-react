import "./header.styles.scss";

import { RootState, selectCurrentUser } from "../../core/redux";

import { CartIcon } from "../cart";
import { Crown } from "../../assests";
import { CurrentUser } from "../../models";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { firebaseAuth } from "../../core/firebase";

type HeaderProps = {
  currentUser: CurrentUser;
};

const HeaderInternal = (props: HeaderProps) => {
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
          <div
            className="option"
            onClick={(event: React.SyntheticEvent<HTMLDivElement>) => {
              event.stopPropagation();
              firebaseAuth.firebase_signOut();
            }}>
            SIGN OUT
          </div>
        ) : (
          <Link
            className="option"
            to={{ pathname: "/signin", state: { navType: "inApp" } }}>
            SIGN IN
          </Link>
        )}
        <CartIcon />
      </div>
    </div>
  );
};

export const Header = connect((state: RootState) => ({
  currentUser: selectCurrentUser(state),
}))(HeaderInternal);
