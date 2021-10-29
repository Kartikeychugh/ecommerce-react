export interface IUser {
  displayName: string;
  email: string;
  createdAt: string;
  id: string;
}

/**
 * IUser: Logged-in
 * null: Logged-out or not signed-in yet
 * undefined: We don't know the status
 */
export type CurrentUser = IUser | null | undefined;
