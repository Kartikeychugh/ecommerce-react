import {
  HeaderContainer,
  LogoContainer,
  OptionLink,
  OptionsContainer,
} from "./header.styles";
import { selectUser, useFirebaseAction } from "../../core/redux";

import { CartIcon } from "../cart";
import { Crown } from "../../assests";
import { useSelector } from "react-redux";

export const Header = () => {
  const { signOut } = useFirebaseAction();
  const user = useSelector(selectUser);

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
              signOut();
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
