import { ICollectionItem } from "./collection-data.interface";

export type CartItem = ICollectionItem & { quantity: number };
