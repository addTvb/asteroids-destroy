import { useNavigate } from 'react-router-dom';
import './Header.scss';

export const Header = () => {
	const year = new Date().getFullYear();
	const navigate = useNavigate();
	const handleLink = () => navigate('/');
	return (
		<header className='header' onClick={handleLink}>
			<h1 className='title'>ARMAGEDDON {year}</h1>
			<p className='description'>
				ООО “Команда им. Б. Уиллиса”. Взрываем астероиды с 1998 года.
			</p>
		</header>
	);
};
