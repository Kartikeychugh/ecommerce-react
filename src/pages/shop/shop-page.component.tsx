import {
  RootState,
  selectShopCollections,
  useFirebaseAction,
} from "../../core/redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { CollectionPage } from "../collection";
import { CollectionsOverview } from "../../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type ShopPageProps = {} & RouteComponentProps;

export const ShopPage = (props: ShopPageProps) => {
  const {
    match: { path },
  } = props;
  const collections = useSelector((state: RootState) =>
    selectShopCollections(state)
  );
  const { fetchCollections } = useFirebaseAction();
  useEffect(() => {
    if (collections) {
      return;
    }

    fetchCollections();
  }, [fetchCollections, collections]);

  return (
    <div className="shop-page">
      <Route exact path={`${path}`}>
        <CollectionsOverview collections={collections} />
      </Route>
      <Route path={`${path}/:collectionId`} component={CollectionPage} />
    </div>
  );
};
