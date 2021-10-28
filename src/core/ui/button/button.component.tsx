import "./button.styles.scss";

interface IButtonProperties {
  type: "button" | "submit" | "reset" | undefined;
  className: string;
  onClick: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

type ButtonProps = React.PropsWithChildren<Partial<IButtonProperties>> &
  Partial<IButtonProperties>;

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  const { children, className, onClick, type } = props;
  return (
    <button
      className={`custom-button ${className ? className : ""}`}
      {...(type ? { type } : {})}
      {...(onClick ? { onClick } : {})}>
      {children}
    </button>
  );
};
