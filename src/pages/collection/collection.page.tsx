import "./collection.styles.scss";

import { RootState, selectCollection } from "../../core/redux";

import { CollectionItem } from "../../components";
import { ICollection } from "../../models";
import { RouteComponentProps } from "react-router";
import { connect } from "react-redux";

type CollectionsPage = {
  collection: ICollection | null;
} & RouteComponentProps<{ collectionId: string }>;

const CollectionPageInternal = (props: CollectionsPage) => {
  const { collection } = props;

  return collection ? (
    <div className="collection-page">
      <h2 className="title">{collection.title.toUpperCase()}</h2>
      <div className="items">
        {collection.items.map((item) => (
          <CollectionItem key={item.id} item={item} />
        ))}
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state: RootState, ownProps: CollectionsPage) => {
  return {
    collection: selectCollection(ownProps.match.params.collectionId)(state),
  };
};

export const CollectionPage = connect(mapStateToProps)(CollectionPageInternal);
