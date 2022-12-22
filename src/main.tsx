import React from 'react';
import ReactDOM from 'react-dom';

import idLocale from 'date-fns/locale/id';

import { DateRange, DateRangePicker } from '../lib/index';

const App = () => {
	const [range1, setRange1] = React.useState<DateRange>({});
	const [range2, setRange2] = React.useState<DateRange>({});

	return (
		<div>
			<DateRangePicker onChange={setRange1} />
			<div>{JSON.stringify(range1)}</div>

			<DateRangePicker locale={idLocale} onChange={setRange2} />
			<div>{JSON.stringify(range2)}</div>
		</div>
	);
};


ReactDOM.render(<App />, document.getElementById('root')!);
