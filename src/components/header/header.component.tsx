// import "./header.styles.scss";

import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import {
  WithFirebaseAuthProps,
  WithFirebaseUserProps,
  withFirebaseAuth,
  withFirebaseUser,
} from "../../core/firebase";

import { CartIcon } from "../cart";
import { Crown } from "../../assests";

type HeaderProps = {} & WithFirebaseAuthProps & WithFirebaseUserProps;

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
          <OptionLink to={{ pathname: "/signin", state: { navType: "inApp" } }}>
            SIGN IN
          </OptionLink>
        )}
        <CartIcon />
      </OptionsContainer>
    </HeaderContainer>
  );
};

export const Header = withFirebaseAuth(withFirebaseUser(HeaderInternal));
