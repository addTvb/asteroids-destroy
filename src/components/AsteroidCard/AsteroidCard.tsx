import { forwardRef, useMemo } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { measureToggleAtom } from 'state/measureToggleAtom';
import { Button } from 'shared/Button/Button';
import { getTextDate } from 'utils/getTextDate';
import { formatKmDistance } from 'utils/formatKmDistance';
import { formatLunarDistance } from 'utils/formatLunarDistance';
import { cartAtom } from 'state/cartAtom';
import type { AsteroidCardType } from 'types/asteroid';

import './AsteroidCard.scss';
import { Link } from 'react-router-dom';

interface AsteroidCardProps extends AsteroidCardType {}

/* eslint-disable  @typescript-eslint/no-explicit-any */
export const AsteroidCard = forwardRef<any, AsteroidCardProps>((props, ref) => {
	const { id, date, name, maxDiameter, isDanger, lunarDistance, kmDistance } = props;
	const [cart, setCart] = useRecoilState(cartAtom);

	const isInCart = useMemo(
		() => cart.some((asteroid) => asteroid.id === id),
		[cart, id]
	);

	const handleOrder = () => {
		// Delete from cart
		if (isInCart) {
			const filtered = cart.filter((asteroid) => {
				if (asteroid.id !== id) return asteroid;
			});
			setCart(filtered);
		} else {
			// Add to cart
			setCart([
				...cart,
				{
					id,
					date,
					name,
					maxDiameter,
					isDanger,
					lunarDistance,
					kmDistance,
				},
			]);
		}
	};

	const measure = useRecoilValue(measureToggleAtom);

	const distance = useMemo(() => {
		if (measure === 'km') return formatKmDistance(kmDistance);
		if (measure === 'lunar') return formatLunarDistance(lunarDistance);
	}, [kmDistance, lunarDistance, measure]);

	const diameter = Math.ceil(maxDiameter);
	const isSmall = diameter < 100;

	const card = (
		<>
			<Link to={`/asteroid/${id}`}>
				<h3 className='title'>{getTextDate(date)}</h3>
				<div className='center'>
					<div className='distance'>
						<div className='value'>{distance}</div>
						<img src='/arrow.svg' alt='Distance arrow' />
					</div>
					<img
						src={isSmall ? '/small.png' : '/big.png'}
						alt='Asteroid'
						className='asteroid-img'
					/>
					<div className='info'>
						<div className='name'>{name}</div>
						<div className='diameter'>Ø {diameter} м</div>
					</div>
				</div>
			</Link>
			<div className='bottom'>
				<Button small onClick={handleOrder} isInCart={isInCart}>
					ЗАКАЗАТЬ
				</Button>
				{isDanger && (
					<span className='danger-text'>
						<span className='icon'>⚠ </span>
						Опасен
					</span>
				)}
			</div>
		</>
	);

	const content = ref ? (
		<div className='asteroid-card' ref={ref}>
			{card}
		</div>
	) : (
		<div className='asteroid-card'>{card}</div>
	);
	return content;
});
