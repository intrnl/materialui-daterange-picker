import * as React from 'react';
import {
  addMonths,
  isSameDay,
  isAfter,
  isBefore,
  addYears,
} from 'date-fns';

import { DateRange, NavigationAction } from '../types';
import { getValidatedMonths, parseOptionalDate } from '../utils';

import Menu from './Menu';

type Marker = symbol;

export const MARKERS: { [key: string]: Marker } = {
  FIRST_MONTH: Symbol('firstMonth'),
  SECOND_MONTH: Symbol('secondMonth'),
};

interface DateRangePickerProps {
  initialDateRange?: DateRange;
  minDate?: Date | string;
  maxDate?: Date | string;
  onChange: (dateRange: DateRange) => void;
}

const DateRangePicker: React.FunctionComponent<DateRangePickerProps> = (
  props: DateRangePickerProps,
) => {
  const today = React.useMemo(() => new Date(), []);

  const {
    onChange,
    initialDateRange,
    minDate,
    maxDate,
  } = props;

  const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
  const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));
  const [intialFirstMonth, initialSecondMonth] = getValidatedMonths(
    initialDateRange || {},
    minDateValid,
    maxDateValid,
  );

  const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });
  const [hoverDay, setHoverDay] = React.useState<Date>();
  const [firstMonth, setFirstMonth] = React.useState<Date>(intialFirstMonth || today);
  const [secondMonth, setSecondMonth] = React.useState<Date>(
    initialSecondMonth || addMonths(firstMonth, 1),
  );

  const { startDate, endDate } = dateRange;

  // handlers
  const setFirstMonthValidated = (date: Date) => {
    if (isBefore(date, secondMonth)) {
      setFirstMonth(date);
    }
  };

  const setSecondMonthValidated = (date: Date) => {
    if (isAfter(date, firstMonth)) {
      setSecondMonth(date);
    }
  };

  const onDayClick = (day: Date) => {
    if (startDate && !endDate) {
      const newRange = day < startDate
        ? { startDate: day, endDate: startDate }
        : { startDate: startDate, endDate: day }

      onChange(newRange);
      setDateRange(newRange);
    } else {
      const newRange = { startDate: day, endDate: undefined }

      onChange(newRange)
      setDateRange({ startDate: day, endDate: undefined });
    }
    
    setHoverDay(day);
  };

  const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
    if (marker === MARKERS.FIRST_MONTH) {
      const firstNew = addMonths(firstMonth, action);
      if (isBefore(firstNew, secondMonth)) setFirstMonth(firstNew);
    } else {
      const secondNew = addMonths(secondMonth, action);
      if (isBefore(firstMonth, secondNew)) setSecondMonth(secondNew);
    }
  };

  const onDayHover = (date: Date) => {
    if (startDate && !endDate) {
      if (!hoverDay || !isSameDay(date, hoverDay)) {
        setHoverDay(date);
      }
    }
  };

  // helpers
  const inHoverRange = (date: Date) => {
    if (!startDate || !hoverDay) {
      return false
    }

    return (
      (date >= startDate && date <= hoverDay) ||
      (date >= hoverDay && date <= startDate)
    )
  }

  const helpers = {
    inHoverRange,
  };

  const handlers = {
    onDayClick,
    onDayHover,
    onMonthNavigate,
  };

  return (
    <Menu
      dateRange={dateRange}
      minDate={minDateValid}
      maxDate={maxDateValid}
      firstMonth={firstMonth}
      secondMonth={secondMonth}
      setFirstMonth={setFirstMonthValidated}
      setSecondMonth={setSecondMonthValidated}
      helpers={helpers}
      handlers={handlers}
    />
  )
};

export default DateRangePicker;
