import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import './Inventory.css';
import Autocomplete from './autocomplete/Autocomplete';
import Table from './Table';
import { filterByInstockLevel } from '../filters/filters';

interface PartType {
	id: number;
	name: string;
	instock: string;
	price: string;
}

function Inventory() {
	const [parts, setParts] = useState<PartType[]>([]);
	const [queryParams, setQueryParams] = useState<string>('');
	const [selected, setSelected] = useState<string>('');
	const [currentSort, setCurrentSort] = useState<string>('down');
	const [instockInputValue, setInstockInputValue] = useState<number>(50);
	const ref = useRef<HTMLDivElement>(null);

	const filterBySelected = (): PartType[] => {
		return parts.filter((part) => part.name.toLowerCase() === selected.toLowerCase());
	};

	const filterByQuery = (): PartType[] => {
		return parts.filter(
			(part) =>
				part.name.toLowerCase() === queryParams.toLowerCase() ||
				part.name.toLowerCase().includes(queryParams.toLowerCase()) ||
				(filterByInstockLevel(part.instock, instockInputValue) && queryParams.includes('low')) ||
				(parseInt(part.instock) === 0 && queryParams.includes('out')),
		);
	};

	const handleInstockInput = (e: ChangeEvent<HTMLInputElement>) => {
		setInstockInputValue(parseInt(e.target.value));
	};

	const handleSort = (sortBy: string): void => {
		const sortDesc = [...parts].sort((a: any, b: any) => {
			if (sortBy !== 'price' && sortBy !== 'instock') {
				return a[sortBy] < b[sortBy] ? -1 : a[sortBy] > b[sortBy] ? 1 : 0;
			} else {
				return a[sortBy] - b[sortBy];
			}
		});
		const sortAsc = [...parts].sort((a: any, b: any) => {
			if (sortBy !== 'price' && sortBy !== 'instock') {
				return a[sortBy] > b[sortBy] ? -1 : a[sortBy] < b[sortBy] ? 1 : 0;
			} else {
				return b[sortBy] - a[sortBy];
			}
		});

		if (currentSort === 'up') {
			setCurrentSort('down');
			setParts(sortDesc);
		}

		if (currentSort === 'down') {
			setCurrentSort('up');
			setParts(sortAsc);
		}
	};

	useEffect(() => {
		if (queryParams === '') {
			setSelected('');
		}
	}, [queryParams]);

	useEffect(() => {
		const fetchData = async () => {
			await fetch('http://localhost:8000/parts')
				.then((resp) => {
					if (resp.ok) {
						return resp.json();
					}
				})
				.then((data) => {
					const myData: PartType[] = data;
					setParts(myData);
				})
				.catch((err) => console.log(err));
		};
		fetchData();
	}, []);

	return (
		<main className='inventory-container'>
			<div className={`search-panel`} ref={ref}>
				<div className='dropdown'>
					<h1>Search Inventory</h1>
					<Autocomplete
						data={parts.map((p) => p.name)}
						setQueryParams={setQueryParams}
						setSelected={setSelected}
					/>
				</div>
				<button
					type='reset'
					onClick={() => {
						setQueryParams('');
						setSelected('');
					}}
					className='reset-search-button'
				>
					Show All
				</button>

				<input type='number' value={instockInputValue} onChange={(e) => handleInstockInput(e)} />
			</div>
			<Table
				userSetInstockLimit={instockInputValue}
				handleSort={handleSort}
				parts={selected ? filterBySelected() : queryParams.length > 0 ? filterByQuery() : parts}
			/>
		</main>
	);
}

export default Inventory;
