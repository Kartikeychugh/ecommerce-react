import "./collections-overview.styles.scss";

import { RootState, selectShopItems } from "../../../core/redux";

import { CollectionPreview } from "../collection-preview";
import { ICollectionData } from "../../../models";
import { connect } from "react-redux";

type CollectionsOverviewProps = {
  shopItems?: ICollectionData[];
};

const CollectionsOverviewInternal = (props: CollectionsOverviewProps) => {
  return (
    <div className="collection-preview">
      {props.shopItems && props.shopItems.length
        ? props.shopItems.map((shopItem) => (
            <CollectionPreview
              key={shopItem.id}
              title={shopItem.title}
              items={shopItem.items}
            />
          ))
        : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    shopItems: selectShopItems(state),
  };
};

export const CollectionsOverview = connect(mapStateToProps)(
  CollectionsOverviewInternal
);
