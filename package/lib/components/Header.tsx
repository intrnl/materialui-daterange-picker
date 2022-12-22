/* eslint-disable radix */

import {
  makeStyles,
  IconButton,
  Select,
  MenuItem,
} from '@material-ui/core';
import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {
  setMonth,
  getMonth,
  setYear,
  getYear,
} from 'date-fns';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
  },
  iconButton: {
    height: 36,
    width: 36,
    padding: 8,
  },
}));

interface HeaderProps {
  date: Date;
  setDate: (date: Date) => void;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

const generateYears = (relativeTo: Date, count: number) => {
  const half = Math.floor(count / 2);
  return Array(count)
    .fill(0)
    .map((_y, i) => relativeTo.getFullYear() - half + i); // TODO: make part of the state
};

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  setDate,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}: HeaderProps) => {
  const classes = useStyles();

  const handleMonthChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(setMonth(date, parseInt(event.target.value)));
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDate(setYear(date, parseInt(event.target.value)));
  };

  return (
    <div className={classes.header}>
      <IconButton disabled={prevDisabled} onClick={onClickPrevious} className={classes.iconButton}>
        <ChevronLeft  />
      </IconButton>

      <Select
        value={getMonth(date)}
        onChange={handleMonthChange}
        disableUnderline
      >
        {MONTHS.map((month, idx) => (
          <MenuItem key={month} value={idx}>
            {month}
          </MenuItem>
        ))}
      </Select>

      <Select
        value={getYear(date)}
        onChange={handleYearChange}
        disableUnderline
      >
        {generateYears(date, 30).map((year) => (
          <MenuItem key={year} value={year}>
            {year}
          </MenuItem>
        ))}
      </Select>

      <IconButton disabled={nextDisabled} onClick={onClickNext} className={classes.iconButton}>
        <ChevronRight />
      </IconButton>
    </div>
  );
};

export default Header;
