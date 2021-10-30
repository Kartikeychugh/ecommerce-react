import { connect } from "react-redux";
import { Dispatch } from "redux";
import { addToCart } from "../../core/redux/cart";
import { Button } from "../../core/ui";
import { ICollectionItem } from "../../models/collection-data.interface";
import "./collection-item.styles.scss";

type CollectionItemProps = {
  item: ICollectionItem;
  addToCart: (item: ICollectionItem) => void;
};

const CollectionItemInternal = (props: CollectionItemProps) => {
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

      <Button className="inverted" onClick={() => props.addToCart(item)}>
        ADD TO CART
      </Button>
    </div>
  );
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    addToCart: (item: ICollectionItem) => dispatch(addToCart(item)),
  };
};
export const CollectionItem = connect(
  null,
  mapDispatchToProps
)(CollectionItemInternal);
