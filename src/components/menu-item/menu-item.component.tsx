import { withRouter, RouteComponentProps } from "react-router";
import { ISection } from "../../models";
import "./menu-item.styles.scss";
interface IMenuItemProps extends RouteComponentProps {
  section: ISection;
}

export const MenuItem = withRouter((props: IMenuItemProps) => {
  const {
    section: { imageUrl, size, title, linkUrl },
    match,
    history,
  } = props;

  return (
    <div
      style={{ backgroundImage: `url(${imageUrl})` }}
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}>
      <div
        className="background-image"
        style={{ backgroundImage: `url(${imageUrl})` }}></div>
      <div className="content">
        <h1 className="title">{title.toUpperCase()}</h1>
        <span className="subtitle">SHOP NOW</span>
      </div>
    </div>
  );
});
