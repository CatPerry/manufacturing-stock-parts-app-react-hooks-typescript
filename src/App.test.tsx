import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('to render the Inventory, Search, and Table', () => {
	render(<App />);

	expect(screen.getByRole('main')).toBeInTheDocument();
	expect(screen.getByRole('main')).toHaveClass('inventory-container');
	expect(screen.getByRole('table')).toBeInTheDocument();
	expect(screen.getByRole('table')).toHaveTextContent('ID');
	expect(screen.getByRole('searchbox')).toBeInTheDocument();
});
