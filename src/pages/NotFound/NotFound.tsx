import { Link } from 'react-router-dom';
import './NotFound.scss';

export const NotFound = () => {
	return (
		<div className='not-found'>
			<h1>404 нет такой страницы🤷‍♂️</h1>
			<Link to='/'>Главная страница</Link>
		</div>
	);
};
