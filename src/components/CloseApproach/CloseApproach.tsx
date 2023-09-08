import './CloseApproach.scss';

interface CloseApproachProps {
	speed: string;
	orbit: string;
	distance: string;
	date: string;
}
export const CloseApproach = (props: CloseApproachProps) => {
	const { speed, orbit, distance, date } = props;
	return (
		<div className='approach'>
			<div className='date'>{date}</div>
			<div className='data-item'>
				Скорость: <span className='value'> {Math.ceil(Number(speed))} км/ч </span>
			</div>
			<div className='data-item'>
				Расстояние до Земли:{' '}
				<span className='value'>{Math.ceil(Number(distance))} км</span>
			</div>
			<div className='data-item'>
				Орбита: <span className='value'> {orbit}</span>{' '}
			</div>
		</div>
	);
};
