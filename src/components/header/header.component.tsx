import { Link } from "react-router-dom";
import { Crown } from "../../assests";
import "./header.styles.scss";
import { firebaseAuth } from "../../core/firebase";
import { CurrentUser } from "../../models";
import { connect } from "react-redux";

import { RootState } from "../../core/redux";
import { CartIcon } from "./cart-icon.component";
import { CartDropdown } from "../cart-dropdown/cart-dropdown.component";

type HeaderProps = {
  currentUser: CurrentUser;
  cartOpen: boolean;
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
            onClick={() => firebaseAuth.firebase_signOut()}>
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
        {props.cartOpen ? <CartDropdown /> : null}
      </div>
    </div>
  );
};

export const Header = connect((state: RootState) => ({
  currentUser: state.user.currentUser,
  cartOpen: state.cart.cartOpen,
}))(HeaderInternal);
