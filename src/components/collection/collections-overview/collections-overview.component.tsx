import "./collections-overview.styles.scss";

import { CollectionData } from "../../../models";
import { CollectionPreview } from "../collection-preview";

type CollectionsOverviewProps = {
  collections: CollectionData;
};

const CollectionsOverviewInternal = (props: CollectionsOverviewProps) => {
  const { collections } = props;
  return collections ? (
    <div className="collection-preview">
      {Object.keys(collections).map((shopItemKey: string) => {
        const shopItem = collections[shopItemKey];
        return (
          <CollectionPreview
            key={shopItemKey}
            title={shopItem.title.toUpperCase()}
            items={shopItem.items}
          />
        );
      })}
    </div>
  ) : null;
};

export const CollectionsOverview = CollectionsOverviewInternal;
