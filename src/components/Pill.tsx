import React from 'react';
import './Pill.css';

function Pill({ type }: { type: string }) {
	return <span className={type}>{type === 'out-of-stock' ? 'Out of Stock' : 'Low Stock'}</span>;
}

export default Pill;
