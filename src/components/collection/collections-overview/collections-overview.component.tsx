import "./collections-overview.styles.scss";

import { RootState, selectShopCollections } from "../../../core/redux";

import { CollectionData } from "../../../models";
import { CollectionPreview } from "../collection-preview";
import { connect } from "react-redux";

type CollectionsOverviewProps = {
  collections: CollectionData;
};

const CollectionsOverviewInternal = (props: CollectionsOverviewProps) => {
  const { collections } = props;
  return (
    <div className="collection-preview">
      {collections
        ? Object.keys(collections).map((shopItemKey: string) => {
            const shopItem = collections[shopItemKey];
            return (
              <CollectionPreview
                key={shopItemKey}
                title={shopItem.title}
                items={shopItem.items}
              />
            );
          })
        : null}
    </div>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    collections: selectShopCollections(state),
  };
};

export const CollectionsOverview = connect(mapStateToProps)(
  CollectionsOverviewInternal
);
