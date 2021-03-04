import React, { Dispatch, FunctionComponent, SetStateAction, useState } from 'react';
import './Autocomplete.css';

interface AutoCompleteProps {
	setQueryParams: Dispatch<SetStateAction<string>>;
	data: string[];
	setSelected: Dispatch<SetStateAction<string>>;
}

const Autocomplete: FunctionComponent<AutoCompleteProps> = ({
	data,
	setQueryParams,
	setSelected,
}) => {
	const [userInput, setUserInput] = useState<string>('');
	const [filtered, setFiltered] = useState<string[]>([]);
	const [activeSuggestion, setActiveSuggestion] = useState<number>(0);

	const cmp = (row: string, text: string) => {
		const r = row.toLocaleLowerCase().indexOf(text) > -1;
		return r;
	};

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const text = e.target.value;
		setUserInput(text);

		setQueryParams(text);
		const filtered = data.filter((row) => {
			return cmp(row, text);
		});
		setFiltered(filtered);
		setActiveSuggestion(0);
	};

	const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setUserInput(filtered[activeSuggestion]);
			setFiltered([]);
			setSelected(filtered[activeSuggestion]);
		} else if (e.key === 'ArrowUp') {
			e.preventDefault();
			if (activeSuggestion === 0) {
				return;
			}
			setActiveSuggestion(activeSuggestion - 1);
		} else if (e.key === 'ArrowDown') {
			e.preventDefault();
			console.log(`Active ${activeSuggestion} Length: ${filtered.length}`);
			if (activeSuggestion + 1 === filtered.length) {
				return;
			}
			setActiveSuggestion(activeSuggestion + 1);
		}
	};

	const onClick = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
		setSelected(e.currentTarget.innerText);
		setActiveSuggestion(0);
		setFiltered([]);
		setUserInput(e.currentTarget.innerText);
	};

	return (
		<div className='autocomplete'>
			<input
				type='search'
				onChange={onChange}
				onKeyDown={onKeyDown}
				value={userInput}
				placeholder='search by name or stock level (e.g. low, out)'
			/>

			<ul>
				{filtered.length > 0 && filtered.length !== data.length ? (
					filtered.map((row, idx) => {
						return (
							<li
								className={idx === activeSuggestion ? 'autocomplete-active' : ''}
								key={row}
								onClick={onClick}
								aria-haspopup='true'
								aria-expanded='false'
							>
								{row}
							</li>
						);
					})
				) : (
					<></>
				)}
			</ul>
		</div>
	);
};

export default Autocomplete;
