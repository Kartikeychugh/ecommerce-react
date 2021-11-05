import "./collection-item.styles.scss";

import { Button } from "../../../core/ui";
import { Dispatch } from "redux";
import { ICollectionItem } from "../../../models/collection-data.interface";
import { addToCart } from "../../../core/redux";
import { connect } from "react-redux";

type CollectionItemProps = {
  item: ICollectionItem;
  addToCart: (item: ICollectionItem) => void;
};

const CollectionItemInternal = (props: CollectionItemProps) => {
  const { item } = props;
  return (
    <div className="collection-item">
      {/* <div
        className="image"
        style={{ backgroundImage: `url(${item.imageUrl})` }}
      /> */}
      <img alt="item" src={item.imageUrl} className="image" />

      <div className="collection-footer">
        <span className="name">{item.name}</span>
        <span className="price">{item.price}</span>
      </div>

      <Button invertedButton={true} onClick={() => props.addToCart(item)}>
        ADD TO CART
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => ({
  addToCart: (item: ICollectionItem) => dispatch(addToCart(item)),
});

export const CollectionItem = connect(
  null,
  mapDispatchToProps
)(CollectionItemInternal);
