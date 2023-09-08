import { useRef, useState } from 'react';
import './Select.css';
import clsx from 'clsx';
import { useOnClickOutside } from 'usehooks-ts';
import { ChangeFunction } from 'types/base';

interface Option {
	name: string;
	value: string;
}
interface SelectProps {
	options: Option[];
	setValue: ChangeFunction;
	name: string;
}
export const Select = (props: SelectProps) => {
	const { options, setValue, name } = props;
	const [currentValue, setCurrentValue] = useState('');
	const [open, setOpen] = useState(false);

	const toggleOpen = () => setOpen(!open);
	const handleClose = () => setOpen(false);
	const handleSelect = (option: Option) => {
		setCurrentValue(option.name);
		setValue(name, option.value);
		handleClose();
	};

	const selectRef = useRef(null);
	useOnClickOutside(selectRef, handleClose);

	return (
		<div className='select-wrapper' ref={selectRef}>
			<button className='select-button' onClick={toggleOpen}>
				<span className='value'>
					{currentValue === '' ? options[0].name : currentValue}
				</span>
				<span className='arrow-wrapper'>
					<span className={clsx('arrow', open && 'open')}>&darr;</span>
				</span>
			</button>
			{open && (
				<div className='select-list'>
					{options.map((opt, index) => (
						<div
							className='select-item'
							key={`option-${index}`}
							onClick={() => handleSelect(opt)}
						>
							{opt.name}
						</div>
					))}
				</div>
			)}
		</div>
	);
};
