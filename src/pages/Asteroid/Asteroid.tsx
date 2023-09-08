import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { getAsteroid } from 'api/getAsteroid';
import { Header } from 'components/Header/Header';
import { CloseApproach } from 'components/CloseApproach/CloseApproach';
import { Cart } from 'components/Cart/Cart';
import { Loading } from 'shared/Loading/Loading';

import './Asteroid.scss';

export const Asteroid = () => {
	const { id } = useParams();

	const { data: asteroid, isLoading } = useQuery(
		['single-asteroid', id],
		() => getAsteroid(id),
		{}
	);

	const diameter = Math.ceil(
		asteroid?.estimated_diameter.meters.estimated_diameter_max || 0
	);
	const isSmall = diameter < 100;
	const isDanger = asteroid?.is_potentially_hazardous_asteroid || false;

	return (
		<div>
			<Header />
			{isLoading ? (
				<div className='asteroid-page-loading'>
					<Loading />
				</div>
			) : (
				<div className='asteroid-page'>
					<main className='asteroid-main'>
						<div className='top'>
							<h1 className='asteroid-name'>Астероид: {asteroid?.name}</h1>
							{isDanger && (
								<span className='danger-text'>
									<span className='icon'>⚠ </span>
									Опасен
								</span>
							)}
							<div className='size-image'>
								<img
									src={isSmall ? '/small.png' : '/big.png'}
									alt='Asteroid'
									className='asteroid-img'
								/>
								<div className='diameter'>Ø {diameter} м</div>
							</div>
						</div>
						<div className='bottom'>
							{asteroid?.close_approach_data.map((approach, index) => (
								<CloseApproach
									date={approach.close_approach_date}
									distance={approach.miss_distance.kilometers}
									orbit={approach.orbiting_body}
									speed={approach.relative_velocity.kilometers_per_hour}
									key={`close-approach-${index}`}
								/>
							))}
						</div>
					</main>
					<Cart />
				</div>
			)}
		</div>
	);
};
