import { ICollectionItem } from "../../models/collection-data.interface";
import { CollectionItem } from "../collection-item/collection-item.component";
import "./collection-preview.styles.scss";

interface ICollectionPreviewProps {
  title: string;
  items: ICollectionItem[];
}

export const CollectionPreview = (props: ICollectionPreviewProps) => {
  const { title, items } = props;
  return (
    <div className="collection-preview">
      <h1 className="title">{title.toUpperCase()}</h1>
      <div className="preview">
        {items
          .filter((_item, index) => index < 4)
          .map((item) => (
            <CollectionItem key={item.id} item={item} />
          ))}
      </div>
    </div>
  );
};
