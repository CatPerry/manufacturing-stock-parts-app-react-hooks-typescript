import React from 'react';
import Pill from './Pill';
import './Pill.css';

interface PartType {
	id: number;
	name: string;
	instock: string;
	price: string;
}

const Table = ({ parts }: { parts: PartType[] }) => {
	return (
		<table>
			<thead>
				<tr>
					<th>ID</th>
					<th>Name</th>
					<th>Amt In Stock</th>
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
								) : parseInt(part.instock) < parseInt('50') ? (
									<span className='stock-info'>
										{parseInt(part.instock)} <Pill type='low-stock' />
									</span>
								) : (
									parseInt(part.instock)
								)}
							</td>
						</tr>
					);
				})}
			</tbody>
		</table>
	);
};

export default Table;
