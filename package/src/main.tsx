import React from 'react';
import ReactDOM from 'react-dom';
import { DateRange, DateRangePicker } from '../lib/index';

const App = () => {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(undefined);

  return (
    <div>
      <DateRangePicker
      onChange={(range) => setDateRange(range)}
      />

      <div>{JSON.stringify(dateRange)}</div>
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root')!);

