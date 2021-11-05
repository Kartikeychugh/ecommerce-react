import { DocumentData, QueryDocumentSnapshot } from "@firebase/firestore";
import { ICollection, ICollectionData, IStoreCollection } from "../../models";
import {
  RootState,
  selectShopCollections,
  setCollections,
} from "../../core/redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { CollectionPage } from "../collection";
import { CollectionsOverview } from "../../components";
import React from "react";
import { connect } from "react-redux";
import { firebaseStore } from "../../core/firebase";

type ShopPageProps = {
  collections: ICollectionData | null;
  setCollections: (collections: ICollectionData) => void;
} & RouteComponentProps;

class ShopPageInternal extends React.Component<ShopPageProps, {}> {
  componentDidMount() {
    // if (this.props.collections) {
    //   return;
    // }

    firebaseStore
      .firebase_getAllDocs(
        firebaseStore.firebase_getCollectionRef("collections")
      )
      .then((qs) => {
        const collections: ICollectionData = {};
        qs.docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data() as IStoreCollection;

          const collection: ICollection = {
            ...data,
            id: doc.id,
          };

          collections[collection.id] = collection;
        });
        return collections;
      })
      .then((collections) => {
        this.props.setCollections(collections);
      });
  }

  public render() {
    const {
      match: { path },
    } = this.props;
    return (
      <div className="shop-page">
        <Route exact path={`${path}`} component={CollectionsOverview} />
        <Route path={`${path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }
}

export const ShopPage = connect(
  (state: RootState) => {
    return {
      collections: selectShopCollections(state),
    };
  },
  (dispatch) => {
    return {
      setCollections: (collections: ICollectionData) =>
        dispatch(setCollections(collections)),
    };
  }
)(ShopPageInternal);
