export interface ICollectionItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface IStoreCollection {
  [key: string]: any;
  title: string;
  items: ICollectionItem[];
}

export interface IStoreCollectionData {
  [key: string]: IStoreCollection;
}

export interface ICollection extends IStoreCollection {
  id: string;
}

export interface ICollectionData extends IStoreCollectionData {
  [key: string]: ICollection;
}

export type CollectionData = ICollectionData | null;
