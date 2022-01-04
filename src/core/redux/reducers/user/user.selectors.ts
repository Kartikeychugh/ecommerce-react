import { RootState } from "../../";

export const selectUser = (state: RootState) => state.user.user;
export const selectLogging = (state: RootState) => state.user.logging;
