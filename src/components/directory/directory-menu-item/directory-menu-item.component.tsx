import { ISection } from "../../../models";
import "./directory-menu-item.styles.scss";

type MenuItemProps = {
  section: ISection;
};

export const MenuItem = (props: MenuItemProps) => {
  const {
    section: { imageUrl, size, title },
  } = props;

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={`${size} menu-item`}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
};