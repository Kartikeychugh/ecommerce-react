import { CollectionPreview } from "../../components";
import { ICollectionData } from "../../models/collection-data.interface";
import React from "react";
import { fetchCollectionData } from "../../fake-server";

interface IShopPageProps {}
interface IShopPageState {
  collections: ICollectionData[];
}

export class ShopPage extends React.Component<IShopPageProps, IShopPageState> {
  constructor(props: IShopPageProps) {
    super(props);
    this.state = {
      collections: [],
    };
  }

  public componentDidMount() {
    const collections = fetchCollectionData() as ICollectionData[];
    this.setState({ collections });
  }

  public shouldComponentUpdate(
    _nextProps: IShopPageProps,
    nextState: IShopPageState
  ) {
    return nextState !== this.state;
  }

  public render() {
    const { collections } = this.state;

    return (
      <div className="shop-page">
        {collections.length
          ? collections.map((collection) => (
              <CollectionPreview
                key={collection.id}
                title={collection.title}
                items={collection.items}
              />
            ))
          : null}
      </div>
    );
  }
}
