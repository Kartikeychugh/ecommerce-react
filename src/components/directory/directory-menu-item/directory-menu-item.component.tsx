import "./directory-menu-item.styles.scss";

import { RouteComponentProps, withRouter } from "react-router-dom";

import { ISection } from "../../../models";

type MenuItemProps = {
  section: ISection;
} & RouteComponentProps;

const MenuItemInternal = (props: MenuItemProps) => {
  const {
    section: { imageUrl, size, title },
  } = props;

  return (
    <div
      onClick={() =>
        props.history.push(`${props.match.url}${props.section.linkUrl}`)
      }
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

export const MenuItem = withRouter(MenuItemInternal);
