import "./button.styles.scss";

import { StyledButton } from "./button.styles";

export interface IButtonProperties {
  type: "button" | "submit" | "reset";
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  googleButton?: boolean;
  invertedButton?: boolean;
}

type ButtonProps = React.PropsWithChildren<Partial<IButtonProperties>> &
  Partial<IButtonProperties>;

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  const { type, onClick, children, googleButton, invertedButton } = props;
  return (
    <StyledButton
      googleButton={!!googleButton}
      invertedButton={!!invertedButton}
      {...(type ? { type } : { type: "button" })}
      {...(onClick ? { onClick } : { onClick: () => {} })}>
      {children}
    </StyledButton>
  );
};
