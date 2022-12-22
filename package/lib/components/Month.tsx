import * as React from 'react';
import {
  makeStyles,
  Typography,
} from '@material-ui/core';
import {
  getDate,
  isSameMonth,
  isToday,
  isWithinInterval,
} from 'date-fns';
import {
  getDaysInMonth,
  isStartOfRange,
  isEndOfRange,
  inDateRange,
  isRangeSameDay,
} from '../utils';
import Header from './Header';
import Day from './Day';

import { NavigationAction, DateRange } from '../types';

const WEEK_DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    width: 290,
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(7, 1fr)',
    gridTemplateRows: 'repeat(7, 36px)',
    justifyItems: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    marginTop: 8,
  },
  dayLabel: {
    lineHeight: '36px',
  },
}));

interface MonthProps {
  value: Date;
  marker: symbol;
  dateRange: DateRange;
  minDate: Date;
  maxDate: Date;
  navState: [boolean, boolean];
  setValue: (date: Date) => void;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Month: React.FunctionComponent<MonthProps> = (props: MonthProps) => {
  const classes = useStyles();

  const {
    helpers,
    handlers,
    value: date,
    dateRange,
    marker,
    setValue: setDate,
    minDate,
    maxDate,
  } = props;

  const [back, forward] = props.navState;

  return (
    <div className={classes.root}>
      <Header
        date={date}
        setDate={setDate}
        nextDisabled={!forward}
        prevDisabled={!back}
        onClickPrevious={() => handlers.onMonthNavigate(marker, NavigationAction.Previous)}
        onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
      />

      <div className={classes.grid}>
        {WEEK_DAYS.map((day) => (
          <Typography color="textSecondary" key={day} variant="caption" className={classes.dayLabel}>
            {day}
          </Typography>
        ))}

        {getDaysInMonth(date).map((day, idx) => {
          const isStart = isStartOfRange(dateRange, day);
          const isEnd = isEndOfRange(dateRange, day);
          const isRangeOneDay = isRangeSameDay(dateRange);
          const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

          if (!isSameMonth(date, day)) {
            return <div key={idx} />
          }

          return (
            <Day
              key={idx}
              filled={isStart || isEnd}
              outlined={isToday(day)}
              highlighted={highlighted && !isRangeOneDay}
              disabled={!isWithinInterval(day, { start: minDate, end: maxDate })}
              startOfRange={isStart && !isRangeOneDay}
              endOfRange={isEnd && !isRangeOneDay}
              onClick={() => handlers.onDayClick(day)}
              onHover={() => handlers.onDayHover(day)}
              value={getDate(day)}
            />
          )
        })}
      </div>
    </div>
  );
};

export default Month;
