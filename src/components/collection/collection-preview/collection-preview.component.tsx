import "./collection-preview.styles.scss";

import { CollectionItem } from "../collection-item";
import { ICollectionItem } from "../../../models";

type CollectionPreviewProps = {
  title: string;
  items: ICollectionItem[];
};

export const CollectionPreview = (props: CollectionPreviewProps) => {
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
