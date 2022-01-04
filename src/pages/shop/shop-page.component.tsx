import React, { useEffect } from "react";
import { RootState, selectShopCollections } from "../../core/redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { CollectionPage } from "../collection";
import { CollectionsOverview } from "../../components";
import { FirebaseActions } from "../../core/redux/reducers/firebase/firebase.actions";
import { ICollectionData } from "../../models";
import { connect } from "react-redux";

type ShopPageProps = {
  collections: ICollectionData | null;
  fetchCollections: () => void;
} & RouteComponentProps;

const ShopPageInternal = (props: ShopPageProps) => {
  const {
    collections,
    fetchCollections,
    match: { path },
  } = props;
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

export const ShopPage = connect(
  (state: RootState) => {
    return {
      collections: selectShopCollections(state),
    };
  },
  (dispatch: any) => {
    return {
      fetchCollections: FirebaseActions(dispatch).fetchCollections,
    };
  }
)(ShopPageInternal);
