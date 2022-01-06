import "./collection.styles.scss";

import { RootState, selectCollection } from "../../core/redux";

import { CollectionItem } from "../../components";
import { ICollection } from "../../models";
import { useParams } from "react-router";
import { useSelector } from "react-redux";

export const CollectionPage = () => {
  const { collectionId } = useParams<{ collectionId: string }>();
  const collection = useSelector<RootState, ICollection | null>(
    (state: RootState) => selectCollection(state, collectionId)
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
