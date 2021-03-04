import React from 'react';

function Pill({ type }: { type: string }) {
	return <span className={type}>{type === 'out-of-stock' ? 'Out of Stock' : 'Low Stock'}</span>;
}

export default Pill;
