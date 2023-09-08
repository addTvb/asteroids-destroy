import { useEffect } from 'react';
import dayjs from 'dayjs';
import { useInfiniteQuery } from '@tanstack/react-query';
import { MeasureToggle } from 'components/MeasureToggle/MeasureToggle';
import { AsteroidCard } from 'components/AsteroidCard/AsteroidCard';
import { getAllAsteroids } from 'api/getAllAsteroids';
import { useInView } from 'react-intersection-observer';
import { getDateFromLink } from 'utils/getDateFromLink';

import './AsteroidList.scss';
import { Cart } from 'components/Cart/Cart';
import { Loading } from 'shared/Loading/Loading';

export const AsteroidList = () => {
	const { ref, inView } = useInView();

	const { data, isSuccess, hasNextPage, fetchNextPage, isFetchingNextPage, isFetched } =
		useInfiniteQuery(
			['all-asteroids'],
			({ pageParam = dayjs().format('YYYY-MM-DD') }) => getAllAsteroids(pageParam),
			{
				getNextPageParam: (lastPage) => {
					const nextDate = getDateFromLink(lastPage.links.next);
					return nextDate;
				},
			}
		);

	useEffect(() => {
		if (inView && hasNextPage) fetchNextPage();
	}, [inView, fetchNextPage, hasNextPage]);

	const content =
		isSuccess &&
		data.pages.map((page) => {
			const currentDate = getDateFromLink(page.links.self);
			const asteroids = page.near_earth_objects[currentDate];

			return asteroids.map((item, i) => {
				if (asteroids.length === i + 1) {
					return (
						<AsteroidCard
							ref={ref}
							id={item.id}
							name={item.name}
							date={item.close_approach_data[0].close_approach_date}
							isDanger={item.is_potentially_hazardous_asteroid}
							kmDistance={
								item.close_approach_data[0].miss_distance.kilometers
							}
							lunarDistance={
								item.close_approach_data[0].miss_distance.lunar
							}
							maxDiameter={
								item.estimated_diameter.meters.estimated_diameter_max
							}
							key={`asteroid-${i}`}
						/>
					);
				}
				return (
					<AsteroidCard
						id={item.id}
						name={item.name}
						date={item.close_approach_data[0].close_approach_date}
						isDanger={item.is_potentially_hazardous_asteroid}
						kmDistance={item.close_approach_data[0].miss_distance.kilometers}
						lunarDistance={item.close_approach_data[0].miss_distance.lunar}
						maxDiameter={
							item.estimated_diameter.meters.estimated_diameter_max
						}
						key={`asteroid-${i}`}
					/>
				);
			});
		});

	return (
		<main className='asteroids-wrapper'>
			<div className='inner-wrapper'>
				<div className='top'>
					<h2>Ближайшие подлёты астероидов</h2>
					<MeasureToggle />
				</div>
				{isFetched ? (
					<div className='asteroids-list'>
						{content}
						{isFetchingNextPage && (
							<div className='loading-wrapper'>
								<Loading />
							</div>
						)}
					</div>
				) : (
					<div className='main-loading-wrapper'>
						<Loading />
					</div>
				)}
			</div>
			<Cart />
		</main>
	);
};
