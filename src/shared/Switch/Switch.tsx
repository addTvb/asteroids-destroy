import './Switch.css';

interface SwitchProps {
	label: string;
	onClick: () => void;
    defaultChecked: boolean
}
const Switch = (props: SwitchProps) => {
	const { label, onClick, defaultChecked } = props;
	return (
		<div className='container'>
			<div className='toggle-switch'>
				<input
					type='checkbox'
					className='checkbox'
					name={label}
					id={label}
					onClick={onClick}
                    defaultChecked={defaultChecked}
				/>
				<label className='label' htmlFor={label}>
					<span className='inner' />
					<span className='switch' />
				</label>
			</div>
			{' '}{label}
		</div>
	);
};

export default Switch;
