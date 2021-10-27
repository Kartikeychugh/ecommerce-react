import "./button.styles.scss";

interface IButtonProperties {
  type: "button" | "submit" | "reset" | undefined;
}

type ButtonProps = Partial<IButtonProperties>;

export const Button = (props: React.PropsWithChildren<ButtonProps>) => {
  const { children, ...otherProps } = props;
  return (
    <button className="custom-button" {...otherProps}>
      {children}
    </button>
  );
};
