import React from 'react';
import ReactDOM from 'react-dom';
import { DateRangePicker } from '../lib/index';

const App = () => {
  const [dateRange, setDateRange] = React.useState({});

  return (
    <DateRangePicker
      onChange={(range) => setDateRange(range)}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root')!);

