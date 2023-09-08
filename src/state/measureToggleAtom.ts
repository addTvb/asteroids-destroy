import { atom } from 'recoil';
import { MeasureType } from 'types/base';

export const measureToggleAtom = atom<MeasureType>({
	key: 'measureToggleAtom',
	default: 'km',
});
