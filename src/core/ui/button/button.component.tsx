import "./button.styles.scss";

interface IButtonProperties {
  type: "button" | "submit" | "reset" | undefined;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
  googleButton?: boolean;
  invertedButton?: boolean;
  disabled?: boolean;
}

type ButtonProps = React.PropsWithChildren<Partial<IButtonProperties>> &
  Partial<IButtonProperties>;

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  const {
    children,
    onClick,
    type,
    googleButton,
    invertedButton,
    disabled = false,
  } = props;
  return (
    <button
      disabled={disabled}
      className={`custom-button ${googleButton ? "google-sign-in" : ""} ${
        invertedButton ? "inverted" : ""
      } `}
      {...(type ? { type } : {})}
      {...(onClick ? { onClick } : {})}>
      {children}
    </button>
  );
};
