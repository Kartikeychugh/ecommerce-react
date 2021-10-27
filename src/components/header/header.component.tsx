import { Link } from "react-router-dom";
import { Crown } from "../../assests";
import "./header.styles.scss";

export const Header = () => {
  return (
    <div className="header">
      <Link className="logo-container" to="/">
        <Crown className="logo" />
      </Link>

      <div className="options">
        <Link className="option" to="/shop">
          SHOP
        </Link>
      </div>
    </div>
  );
};
