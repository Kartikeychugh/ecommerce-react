export interface IStoreDirectorySection {
  [field: string]: string | undefined;
  title: string;
  imageUrl: string;
  size?: string;
}

export interface IStoreDirectorySections {
  [key: string]: IStoreDirectorySection;
}

export interface ISection extends IStoreDirectorySection {
  id: string;
}

export type Sections = ISection[] | null;
