import { atom } from "jotai";
export interface Comment {
  id: string;
  user: {
    name: string;
  };
  created_at_format2: string;
  comment: string;
}

interface AtomComment {
  comments: Comment[];
}
interface AtomLikeComment {
  like: number;
}

interface AtomSharedComment {
  share: number;
}

interface AtomStationService {
  id?: number;
  subItem?: null | number;
  data?: DataStation[];
  center?: {
    lat: number;
    lng: number;
  };
  floatBannerCookie?: boolean;
}

export interface DataStation {
  name: string
  address: string
  schedule: string
  phone: null | string
  latitude: string
  longitude:string
}

export const headerAtom = atom({
  view: true,
});

export const noticeAtom = atom<AtomComment>({
  comments: [],
});

export const noticeLikesAtom = atom<AtomLikeComment>({
  like: 0,
});

export const noticeSharedAtom = atom<AtomSharedComment>({
  share: 0,
});

export const floatBannerCookieAtom = atom<boolean>(false);

export const heightFooterAtom = atom<number>(0);

export const cookiesAcceptedAtom = atom<boolean | undefined>(undefined);

export const stationServiceAtom = atom<AtomStationService>({
  id: 0,
  subItem: null,
  data: [],
  center: {
    lat: 0,
    lng: 0,
  },
 
});

export const updateStationServiceAtom = atom(
  null,
  (get, set, update: Partial<AtomStationService>) => {
    set(stationServiceAtom, { ...get(stationServiceAtom), ...update });
  }
);