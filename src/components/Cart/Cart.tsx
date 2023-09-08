import { useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { cartAtom } from 'state/cartAtom';
import { Button } from 'shared/Button/Button';
import { AsteroidCard } from 'components/AsteroidCard/AsteroidCard';
import { useOnClickOutside } from 'usehooks-ts';
import { Toaster, toast } from 'react-hot-toast';
import { getNumWord } from 'utils/getNumWord';

import './Cart.scss';

export const Cart = () => {
	const [cart] = useRecoilState(cartAtom);
	const [open, setOpen] = useState(false);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	return (
		<>
			<Toaster />
			{open && <CartModal onClose={handleClose} />}
			<div className='cart-preview'>
				<div className='info'>
					<div className='title'>Корзина</div>
					<div className='count'>
						{getNumWord(cart.length, ['астероид', 'астероида', 'астероидов'])}
					</div>
				</div>
				<Button onClick={handleOpen}>Отправить</Button>
			</div>
		</>
	);
};

interface CardModalProps {
	onClose: () => void;
}
const CartModal = (props: CardModalProps) => {
	const { onClose } = props;
	const [cart, setCart] = useRecoilState(cartAtom);

	const clickRef = useRef(null);
	useOnClickOutside(clickRef, onClose);

	const handleOrder = () => {
		toast('Поздравляю! Астероиды скоро будут уничтожены💣', {
			icon: '🌎',
			style: {
				borderRadius: '10px',
				background: '#333',
				color: '#fff',
			},
		});
		handleDeleteAll();
		onClose();
	};
	const handleDeleteAll = () => setCart([]);

	const isCartEmpty = cart.length === 0;

	return (
		<>
			<div className='modal-wrapper'>
				<div className='cart-modal' ref={clickRef}>
					<h2 className='title'>Корзина</h2>
					<button className='cross' onClick={onClose}>
						&#9587;
					</button>
					<div className='actions'>
						<Button onClick={handleDeleteAll} disabled={isCartEmpty}>
							Удалить все
						</Button>
						<Button onClick={handleOrder} disabled={isCartEmpty}>
							Заказать🌠
						</Button>
					</div>
					{isCartEmpty ? (
						<div className='empty-cart'>Корзина пуста🤷‍♂️</div>
					) : (
						<div className='container'>
							{cart.map((asteroid) => (
								<AsteroidCard
									id={asteroid.id}
									date={asteroid.date}
									name={asteroid.name}
									isDanger={asteroid.isDanger}
									kmDistance={asteroid.kmDistance}
									lunarDistance={asteroid.lunarDistance}
									maxDiameter={asteroid.maxDiameter}
								/>
							))}
						</div>
					)}
				</div>
			</div>
		</>
	);
};
