import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import { RootState, selectUser } from "../../core/redux";

import { CartIcon } from "../cart";
import { Crown } from "../../assests";
import { CurrentUser } from "../../core/firebase";
import { FirebaseActions } from "../../core/redux/reducers/firebase/firebase.actions";
import { connect } from "react-redux";

interface HeaderOwnProps {
  signOut: () => void;
  user: CurrentUser;
}

type HeaderProps = HeaderOwnProps;

const HeaderInternal = (props: HeaderProps) => {
  const { user } = props;
  return (
    <HeaderContainer>
      <LogoContainer to="/">
        <Crown />
      </LogoContainer>

      <OptionsContainer>
        <OptionLink to="/shop">SHOP</OptionLink>
        <OptionLink to="/shop">CONTACT</OptionLink>
        {user ? (
          <OptionLink
            as="div"
            onClick={(event: React.SyntheticEvent<HTMLDivElement>) => {
              event.stopPropagation();
              props.signOut();
            }}>
            SIGN OUT
          </OptionLink>
        ) : (
          <OptionLink
            to={{
              pathname: "/signin",
              state: { navType: "inApp" },
            }}>
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
    </HeaderContainer>
  );
};

export const Header = connect(
  (state: RootState) => {
    return {
      user: selectUser(state),
    };
  },
  (dispatch) => {
    return {
      signOut: FirebaseActions(dispatch).signOut,
    };
  }
)(HeaderInternal);
