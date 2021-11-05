export interface ICollectionItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface ICollection {
  id: number;
  title: string;
  routeName: string;
  items: ICollectionItem[];
}

export interface ICollectionData {
  [key: string]: ICollection;
}

export type CollectionData = ICollectionData | null;
