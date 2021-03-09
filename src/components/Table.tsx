import React, { useState, Dispatch, FunctionComponent } from 'react';
import Pill from './Pill';

interface PartType {
	id: number;
	name: string;
	instock: string;
	price: string;
}
interface TableProps {
	handleSort: (sortBy: string) => void;
	parts: PartType[];
	userSetInstockLimit: number;
}

const Table: FunctionComponent<TableProps> = ({ parts, handleSort, userSetInstockLimit }) => {
	return (
		<table>
			<thead>
				<tr>
					<th onClick={() => handleSort('id')}>ID</th>
					<th onClick={() => handleSort('name')}>Name</th>
					<th onClick={() => handleSort('instock')}>Amt In Stock</th>
					<th onClick={() => handleSort('price')}>Price</th>
				</tr>
			</thead>
			<tbody>
				{parts.map((part) => {
					return (
						<tr key={part.id}>
							<td>{part.id}</td>
							<td>{part.name}</td>
							<td>
								{parseInt(part.instock) === parseInt('0') ? (
									<span className='stock-info'>
										{parseInt(part.instock)} <Pill type='out-of-stock' />
									</span>
								) : parseInt(part.instock) < userSetInstockLimit ? (
									<span className='stock-info'>
										{parseInt(part.instock)} <Pill type='low-stock' />
									</span>
								) : (
									parseInt(part.instock)
								)}
							</td>
							<td>{`$${part.price}`}</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
