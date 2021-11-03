// import "./header.styles.scss";

import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import { RootState, selectCurrentUser } from "../../core/redux";

import { CartIcon } from "../cart";
import { Crown } from "../../assests";
import { CurrentUser } from "../../models";
import { connect } from "react-redux";
import { firebaseAuth } from "../../core/firebase";

type HeaderProps = {
  currentUser: CurrentUser;
};

const HeaderInternal = (props: HeaderProps) => {
  const { currentUser } = props;

  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Crown />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {currentUser ? (
          <OptionLink
            as="div"
            onClick={(event: React.SyntheticEvent<HTMLDivElement>) => {
              event.stopPropagation();
              firebaseAuth.firebase_signOut();
            }}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink to={{ pathname: "/signin", state: { navType: "inApp" } }}>
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
    </HeaderContainer>
  );
};

export const Header = connect((state: RootState) => ({
  currentUser: selectCurrentUser(state),
}))(HeaderInternal);
