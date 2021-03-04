import React from 'react';
import Autocomplete from './Autocomplete';
import { fireEvent, render } from '@testing-library/react';

test('to render Autocomplete', () => {
	const setup = () => {
		const setQueryParams = () => {};
		const setSelected = () => {};
		const utils = render(
			<Autocomplete
				data={['a', 'aab', 'b', 'c']}
				setQueryParams={setQueryParams}
				setSelected={setSelected}
			/>,
		);
		const input = utils.getByRole('searchbox');
		return {
			input,
			...utils,
		};
	};

	const { utils, input } = setup();
	fireEvent.change(input, { target: { value: 'Dragon Tank' } });
	expect(input.value).toBe('Dragon Tank');
});
