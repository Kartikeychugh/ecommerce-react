import "./collection-item.styles.scss";

import { Button } from "../../../core/ui";
import { ICollectionItem } from "../../../models/collection-data.interface";
import { useCartActions } from "../../../core/redux";

type CollectionItemProps = {
  item: ICollectionItem;
};

export const CollectionItem = (props: CollectionItemProps) => {
  const { item } = props;
  const { addToCart } = useCartActions();
  return (
    <div className="collection-item">
      <img alt="item" src={item.imageUrl} className="image" />

      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>

      <Button invertedButton={true} onClick={() => addToCart(item)}>
        ADD TO CART
      </Button>
    </div>
  );
};
