export interface IFireBaseDirectorySection {
  title: string;
  imageUrl: string;
  size?: string;
}

export interface IFireBaseSections {
  [key: string]: IFireBaseDirectorySection;
}

export interface ISection extends IFireBaseDirectorySection {
  id: string;
}

export type Sections = ISection[] | null;
