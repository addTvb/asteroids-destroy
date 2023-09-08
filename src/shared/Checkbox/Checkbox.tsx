import { ChangeEvent } from 'react';
import { ChangeFunction } from 'types/base';

import './Checkbox.css';

interface CheckboxProps {
	label: string;
	name: string;
	onChange: ChangeFunction;
}
export const Checkbox = (props: CheckboxProps) => {
	const { label, name, onChange } = props;
	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		const checked = (event.target as HTMLInputElement).checked;
		onChange(name, checked);
	};
	return (
		<label htmlFor={`${name}-checkbox`} className='checkbox-wrapper'>
			<input
				className='native-input'
				type='checkbox'
				id={`${name}-checkbox`}
				onChange={handleChange}
			/>
			<div className='checkbox'>&#x2713;</div>
			<div className='label'>{label}</div>
		</label>
	);
};
