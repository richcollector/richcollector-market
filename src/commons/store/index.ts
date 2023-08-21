import { atom, selector, RecoilEnv } from "recoil";
import { getAccessToken } from "../libraries/getAccessToken";
import type { IUser } from "../types/generated/types";
RecoilEnv.RECOIL_DUPLICATE_ATOM_KEY_CHECKING_ENABLED = false;

export const accessTokenState = atom({
  key: "accessTokenState",
  default: "",
});

export const restoreAccessTokenLoadable = selector({
  key: "restoreAccessTokenLoadable",
  get: async () => {
    const newAccessToken = await getAccessToken();
    return newAccessToken;
  },
});

export const userInfomation = atom<IUser[]>({
  key: "userInfomation",
  default: [],
});
