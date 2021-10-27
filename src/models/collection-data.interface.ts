export interface ICollectionItem {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export interface ICollectionData {
  id: number;
  title: string;
  routeName: string;
  items: ICollectionItem[];
}
