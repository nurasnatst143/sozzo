const DropdownSelect = ({ options, selectedOption, onSelect }) => {
	return (
		<select
			className='input'
			value={selectedOption}
			onChange={(e) => onSelect(e.target.value)}
			name='category'
			id='category'
			required
		>
			{options.map((option, index) => (
				<option key={index} value={option.slug}>
					{option.name}
				</option>
			))}
		</select>
	);
};

export default DropdownSelect;
