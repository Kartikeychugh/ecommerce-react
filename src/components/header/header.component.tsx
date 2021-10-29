import { Link } from "react-router-dom";
import { Crown } from "../../assests";
import "./header.styles.scss";
import { firebaseAuth } from "../../core/firebase";
import { CurrentUser } from "../../models";
import { connect } from "react-redux";
import { RootState } from "../../core/redux";

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
      </div>
    </div>
  );
};

export const Header = connect((state: RootState) => ({
  currentUser: state.user.currentUser,
}))(HeaderInternal);
