import { measureToggleAtom } from 'state/measureToggleAtom';
import './MeasureToggle.scss';
import { useRecoilState } from 'recoil';
import clsx from 'clsx';
import { MeasureType } from 'types/base';

export const MeasureToggle = () => {
	const [measure, setMeasure] = useRecoilState(measureToggleAtom);
	const handleToggle = (newMeasure: MeasureType) => setMeasure(newMeasure);

	return (
		<div className='measure-toggle'>
			<button
				onClick={() => handleToggle('km')}
				className={clsx(measure === 'km' && 'selected')}
			>
				в километрах{' '}
			</button>
			<span>|</span>
			<button
				onClick={() => handleToggle('lunar')}
				className={clsx(measure === 'lunar' && 'selected')}
			>
				в лунных орбитах
			</button>
		</div>
	);
};
