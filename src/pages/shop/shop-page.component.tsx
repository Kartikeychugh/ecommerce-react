import { Route, RouteComponentProps } from "react-router-dom";

import { CollectionPage } from "../collection/collection.component";
import { CollectionsOverview } from "../../components";
import { ICollectionData } from "../../models/collection-data.interface";

type ShopPageProps = {
  items?: ICollectionData[];
} & RouteComponentProps;

const ShopPageInternal = (props: ShopPageProps) => {
  return (
    <div className="shop-page">
      <Route
        exact
        path={`${props.match.path}`}
        component={CollectionsOverview}
      />
      <Route
        path={`${props.match.path}/:collectionId`}
        component={CollectionPage}
      />
    </div>
  );
};

export const ShopPage = ShopPageInternal;
