import { RouteComponentProps } from "react-router";

type CollectionsPage = RouteComponentProps;
export const CollectionPage = (props: CollectionsPage) => {
  console.log(props);

  return (
    <div className="collection-page">
      <h2>Collections Page</h2>
    </div>
  );
};
