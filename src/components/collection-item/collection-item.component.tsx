import { ICollectionItem } from "../../models/collection-data.interface";
import "./collection-item.styles.scss";

interface ICollectionItemProps {
  item: ICollectionItem;
}

export const CollectionItem = (props: ICollectionItemProps) => {
  const { item } = props;
  return (
    <div className="collection-item">
      <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      />
      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>
    </div>
  );
};
