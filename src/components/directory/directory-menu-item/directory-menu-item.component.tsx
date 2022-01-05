import "./directory-menu-item.styles.scss";

import { useHistory, useRouteMatch } from "react-router-dom";

import { ISection } from "../../../models";

type MenuItemProps = {
  section: ISection;
};

export const MenuItem = (props: MenuItemProps) => {
  const {
    section: { imageUrl, size, title },
  } = props;
  const history = useHistory();
  const match = useRouteMatch();
  return (
    <div
      onClick={() => history.push(`${match.url}shop/${props.section.id}`)}
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
