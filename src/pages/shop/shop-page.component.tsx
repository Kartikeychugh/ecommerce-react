import { Route, RouteComponentProps } from "react-router-dom";
import { selectShopCollections, useFirebaseAction } from "../../core/redux";

import { CollectionPage } from "../collection";
import { CollectionsOverview } from "../../components";
import { useEffect } from "react";
import { useSelector } from "react-redux";

type ShopPageProps = {} & RouteComponentProps;

export const ShopPage = (props: ShopPageProps) => {
  const {
    match: { path },
  } = props;
  const collections = useSelector(selectShopCollections);
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
