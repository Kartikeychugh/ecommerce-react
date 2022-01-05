import "./collection.styles.scss";

import { RootState, selectCollection } from "../../core/redux";

import { CollectionItem } from "../../components";
import { ICollection } from "../../models";
import { RouteComponentProps } from "react-router";
import { useSelector } from "react-redux";

type CollectionsPage = {} & RouteComponentProps<{ collectionId: string }>;

export const CollectionPage = (props: CollectionsPage) => {
  const collection = useSelector<RootState, ICollection | null>(
    (state: RootState) =>
      selectCollection(props.match.params.collectionId)(state)
  );

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
