import {
  DocumentData,
  QueryDocumentSnapshot,
  collection,
  getDocs,
} from "@firebase/firestore";
import {
  RootState,
  selectShopCollections,
  setCollections,
} from "../../core/redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { CollectionPage } from "../collection";
import { CollectionsOverview } from "../../components";
import { ICollectionData } from "../../models";
import React from "react";
import { connect } from "react-redux";
import { query } from "firebase/firestore";
import { store } from "../../core/firebase";

type ShopPageProps = {
  collections: ICollectionData | null;
  setCollections: (collections: ICollectionData) => void;
} & RouteComponentProps;

class ShopPageInternal extends React.Component<ShopPageProps, {}> {
  public componentDidMount() {
    if (this.props.collections) {
      return;
    }

    this.fetchCollections();
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

  private fetchCollections() {
    getDocs(query(collection(store, "collections")))
      .then((querySnapshot) => {
        const docs = querySnapshot.docs;
        const res: { [key: string]: any } = {};

        docs.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          res[doc.id] = data;
        });
        return res;
      })
      .then((storeCollections) => {
        const collections: ICollectionData = {};
        Object.keys(storeCollections).forEach((key) => {
          collections[key] = {
            ...storeCollections[key],
            id: key,
          };
        });

        this.props.setCollections(collections);
      });
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
