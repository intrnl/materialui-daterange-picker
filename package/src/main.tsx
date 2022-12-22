import React from 'react';
import ReactDOM from 'react-dom';
import { DateRange, DateRangePicker } from '../lib/index';

const App = () => {
  const [dateRange, setDateRange] = React.useState(undefined);

  return (
    <div>
      <div>{JSON.stringify(dateRange)}</div>

      <DateRangePicker
        onChange={(range) => setDateRange(range)}
      />
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root')!);

