import { ChangeEvent } from 'react';
import './Input.css';
import { ChangeFunction } from 'types/base';

interface InputProps {
	type: string;
	onChange: ChangeFunction;
	value: string | number;
	name: string;
	placeholder?: string;
}
export const Input = (props: InputProps) => {
	const { type, onChange, value, name, placeholder } = props;
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const value = (event.target as HTMLInputElement).value;
		onChange(name, value);
	};
	const increment = () => {
		if (Number(value) < 18) onChange(name, 17 + 1);
		else onChange(name, Number(value) + 1);
	};
	const decrement = () => {
		if (Number(value) > 18) onChange(name, Number(value) - 1);
	};
	return (
		<div className='input-wrapper'>
			<input
				value={value}
				onChange={handleChange}
				type={type}
				className='input'
				placeholder={placeholder}
			/>
			{type === 'number' && (
				<div className='number-buttons'>
					<button onClick={increment}>&uarr;</button>
					<button onClick={decrement} disabled={Number(value) <= 18}>
						&darr;
					</button>
				</div>
			)}
		</div>
	);
};
