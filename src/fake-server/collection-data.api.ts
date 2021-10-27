import { CollectionData } from "./data";

export const fetchCollectionData = (id?: number) => {
  if (id === undefined) {
    return CollectionData;
  }
  return CollectionData[CollectionData.findIndex((data) => data.id === id)];
};
