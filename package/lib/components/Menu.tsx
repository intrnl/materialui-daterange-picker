import React from 'react';
import {
  Divider,
  Grid,
} from '@material-ui/core';
import { differenceInCalendarMonths } from 'date-fns';
import Month from './Month';
import {
  Setter,
  NavigationAction,
  DateRange,
} from '../types';
import { MARKERS } from './DateRangePicker';

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

  const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;
  const commonProps = {
    dateRange, minDate, maxDate, helpers, handlers,
  };

  return (
    <Grid container direction="row" justifyContent="center" wrap="nowrap">
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
    </Grid>
  );
};

export default Menu;
