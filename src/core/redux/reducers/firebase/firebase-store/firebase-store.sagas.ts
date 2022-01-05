import { ICollectionData, ISection } from "../../../../../models";
import { put, takeLeading } from "redux-saga/effects";

import { FirebaseStoreSagaActions } from "./firebase-store.types";
import { IFirebaseStoreService } from "../../../..";
import { fetchCollectionsSuccess } from "../../shop";
import { fetchSectionSuccess } from "../../directory";

export const initFirebaseStoreSaga = (
  firebaseStoreService: IFirebaseStoreService
) => {
  const createTakeLeadingWatcher = (
    pattern: string,
    generator: (...arg: any[]) => Generator<any>
  ) => {
    function* watcher() {
      yield takeLeading<string, typeof generator>(pattern, generator);
    }

    return watcher;
  };

  const watchFetchSections = createTakeLeadingWatcher(
    FirebaseStoreSagaActions.FETCH_SECTIONS,
    fetchSectionsGenerator(firebaseStoreService)
  );

  const watchFetchCollections = createTakeLeadingWatcher(
    FirebaseStoreSagaActions.FETCH_COLLECTIONS,
    fetchCollectionsGenerator(firebaseStoreService)
  );

  return [watchFetchSections(), watchFetchCollections()];
};

const fetchSectionsGenerator = (firebaseStoreService: IFirebaseStoreService) =>
  function* signOut() {
    try {
      const res: {
        [key: string]: any;
      } = yield firebaseStoreService.getDocuments("directory", "order");

      const sections: ISection[] = [];

      Object.keys(res).forEach((key) => {
        const section = { ...res[key], id: key };
        sections.push(section);
      });

      yield put(fetchSectionSuccess(sections));
    } catch (e) {
      console.log(e);
    }
  };

const fetchCollectionsGenerator = (
  firebaseStoreService: IFirebaseStoreService
) =>
  function* signOut() {
    try {
      const storeCollections: {
        [key: string]: any;
      } = yield firebaseStoreService.getDocuments("collections");

      const collections: ICollectionData = {};

      Object.keys(storeCollections).forEach((key) => {
        collections[key] = {
          ...storeCollections[key],
          id: key,
        };
      });

      yield put(fetchCollectionsSuccess(collections));
    } catch (e) {
      console.log(e);
    }
  };
