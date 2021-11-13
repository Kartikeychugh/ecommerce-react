import "./collections-overview.styles.scss";

import { CollectionData } from "../../../models";
import { CollectionPreview } from "../collection-preview";
import { WithSpinner } from "../../with-spinner/with-spinner.component";

type CollectionsOverviewProps = {
  collections: CollectionData;
};

const CollectionsOverviewInternal = (props: CollectionsOverviewProps) => {
  const { collections } = props;
  return (
    <WithSpinner isLoading={!collections}>
      <div className="collection-preview">
        {collections &&
          Object.keys(collections!).map((shopItemKey: string) => {
            const shopItem = collections![shopItemKey];
            return (
              <CollectionPreview
                key={shopItemKey}
                title={shopItem.title.toUpperCase()}
                items={shopItem.items}
              />
            );
          })}
      </div>
    </WithSpinner>
  );
};

export const CollectionsOverview = CollectionsOverviewInternal;
