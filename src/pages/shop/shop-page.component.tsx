import { RootState, selectShopCollections } from "../../core/redux";
import { Route, RouteComponentProps } from "react-router-dom";

import { CollectionPage } from "../collection";
import { CollectionsOverview } from "../../components";
import { ICollectionData } from "../../models";
import React from "react";
import { connect } from "react-redux";
import { fetchCollectionsAsync } from "../../core/redux/reducers/shop/shop.actions";

type ShopPageProps = {
  collections: ICollectionData | null;
  fetchCollections: () => void;
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
        <Route exact path={`${path}`}>
          <CollectionsOverview collections={this.props.collections} />
        </Route>
        <Route path={`${path}/:collectionId`} component={CollectionPage} />
      </div>
    );
  }

  private fetchCollections() {
    this.props.fetchCollections();
  }
}

export const ShopPage = connect(
  (state: RootState) => {
    return {
      collections: selectShopCollections(state),
    };
  },
  (dispatch: any) => {
    return {
      fetchCollections: () => {
        dispatch(fetchCollectionsAsync());
      },
    };
  }
)(ShopPageInternal);
