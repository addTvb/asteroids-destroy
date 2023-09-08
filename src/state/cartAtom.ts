import { atom } from 'recoil';
import { AsteroidCardType } from 'types/asteroid';

export const cartAtom = atom<AsteroidCardType[]>({ key: 'cartAtom', default: [] });
