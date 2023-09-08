import clsx from 'clsx';
import './Button.scss';

interface ButtonProps {
	children: string;
	onClick: () => void;
	disabled?: boolean;
	small?: boolean;
	isInCart?: boolean;
}
export const Button = (props: ButtonProps) => {
	const { children, onClick, disabled, small, isInCart } = props;
	return (
		<button
			className={clsx('button', small && 'small', isInCart && 'active')}
			disabled={disabled}
			onClick={onClick}
		>
			{isInCart ? 'В КОРЗИНЕ' : children}
		</button>
	);
};
