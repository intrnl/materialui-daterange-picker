import React from 'react';
import ReactDOM from 'react-dom';
import { DateRangePicker } from '../lib/index';

const App = () => {
  const [open, setOpen] = React.useState(true);
  const [dateRange, setDateRange] = React.useState({});

  const toggle = () => setOpen(!open);

  return (
    <DateRangePicker
      open={open}
      toggle={toggle}
      onChange={(range) => setDateRange(range)}
    />
  );
}

ReactDOM.render(<App />, document.getElementById('root')!);

