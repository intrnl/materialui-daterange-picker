import React from 'react';
import {
  makeStyles,
  Divider,
} from '@material-ui/core';
import { differenceInCalendarMonths } from 'date-fns';
import Month from './Month';
import {
  Setter,
  NavigationAction,
  DateRange,
} from '../types';
import { MARKERS } from './DateRangePicker';

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
    gap: '16px',
  },
}));

interface MenuProps {
  dateRange: DateRange,
  minDate: Date;
  maxDate: Date;
  firstMonth: Date;
  secondMonth: Date;
  setFirstMonth: Setter<Date>;
  setSecondMonth: Setter<Date>;
  helpers: {
    inHoverRange: (day: Date) => boolean;
  };
  handlers: {
    onDayClick: (day: Date) => void;
    onDayHover: (day: Date) => void;
    onMonthNavigate: (marker: symbol, action: NavigationAction) => void;
  };
}

const Menu: React.FunctionComponent<MenuProps> = (props: MenuProps) => {
  const {
    dateRange,
    minDate,
    maxDate,
    firstMonth,
    setFirstMonth,
    secondMonth,
    setSecondMonth,
    helpers,
    handlers,
  } = props;

  const classes = useStyles()

  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };

  return (
    <div className={classes.root}>
      <Month
        {...commonProps}
        value={firstMonth}
        setValue={setFirstMonth}
        navState={[true, canNavigateCloser]}
        marker={MARKERS.FIRST_MONTH}
      />

      <Divider flexItem orientation='vertical' />

      <Month
        {...commonProps}
        value={secondMonth}
        setValue={setSecondMonth}
        navState={[canNavigateCloser, true]}
        marker={MARKERS.SECOND_MONTH}
      />
    </div>
  );
};

export default Menu;
