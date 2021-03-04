import React from 'react';
import { render, screen } from '@testing-library/react';
import Table from './Table';

interface PartType {
	id: number;
	name: string;
	instock: string;
	price: string;
}

const parts: PartType[] = [
	{ id: 1, name: 'Geiger Counter', price: '2.99', instock: '3024' },
	{ id: 2, name: 'Dragon Tank', price: '399.84', instock: '24' },
	{ id: 3, name: 'Bug Detector', price: '23.72', instock: '0' },
];

test('to render 4 table rows: 1 header row, 3 parts rows', () => {
	render(<Table parts={parts} />);
	expect(screen.getAllByRole('row')).toHaveLength(4);
});

test('to find a low-stock label if item less than 50 items left', () => {
	render(<Table parts={parts} />);
	expect(screen.getByText('24')).toContainHTML(
		`<span class="stock-info">24 <span class="low-stock">Low Stock</span></span>`,
	);
});

test('to find an out-of-stock label if item has 0 items left', () => {
	render(<Table parts={parts} />);
	expect(screen.getByText('0')).toContainHTML(
		`<span class="stock-info">0 <span class="out-of-stock">Out of Stock</span></span>`,
	);
});
