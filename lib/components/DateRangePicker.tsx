import * as React from 'react';

import { makeStyles, Divider } from '@material-ui/core';

import {
	addMonths,
	addYears,
	differenceInCalendarMonths,
	isSameDay,
	type Locale,
} from 'date-fns';

import { DateHelpers, type DateRange, type NavigationAction } from '../types';
import { getValidatedMonths, parseOptionalDate } from '../utils';

import Month from './Month';


type Marker = symbol;

export const MARKERS: { [key: string]: Marker } = {
	FIRST_MONTH: Symbol('firstMonth'),
	SECOND_MONTH: Symbol('secondMonth'),
};

const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		gap: '16px',
	},
}));

interface DateRangePickerProps {
	initialDateRange?: DateRange;
	minDate?: Date | number;
	maxDate?: Date | number;
	locale?: Locale;
	onChange?: (dateRange: DateRange) => void;
}

const DateRangePicker = (props: DateRangePickerProps) => {
	const {
		initialDateRange,
		minDate,
		maxDate,
		locale,
		onChange,
	} = props;

	const classes = useStyles();
	const today = React.useMemo(() => new Date(), []);

	const [intialFirstMonth, initialSecondMonth] = React.useMemo(() => {
		const minDateValid = parseOptionalDate(minDate, addYears(today, -10));
		const maxDateValid = parseOptionalDate(maxDate, addYears(today, 10));

		return getValidatedMonths(initialDateRange || {}, minDateValid, maxDateValid);
	}, [initialDateRange, minDate, maxDate]);

	const [dateRange, setDateRange] = React.useState<DateRange>({ ...initialDateRange });
	const [hoverDay, setHoverDay] = React.useState<Date>();
	const [firstMonth, setFirstMonth] = React.useState<Date>(intialFirstMonth || today);
	const [secondMonth, setSecondMonth] = React.useState<Date>(initialSecondMonth || (() => addMonths(firstMonth, 1)));

	const { startDate, endDate } = dateRange;

	// handlers
	const onDayClick = (day: Date) => {
		if (startDate && !endDate) {
			const newRange = day < startDate
				? { startDate: new Date(day), endDate: startDate }
				: { startDate: startDate, endDate: new Date(day) };

			newRange.endDate.setHours(23, 59, 59, 999);

			if (onChange) {
				onChange(newRange);
			}

			setDateRange(newRange);
		}
		else {
			const newRange = { startDate: new Date(day), endDate: undefined };

			if (onChange) {
				onChange(newRange);
			}

			setDateRange(newRange);
		}

		setHoverDay(undefined);
	};

	const onMonthNavigate = (marker: Marker, action: NavigationAction) => {
		if (marker === MARKERS.FIRST_MONTH) {
			const firstNew = addMonths(firstMonth, action);
			setFirstMonth(firstNew);
		}
		else {
			const secondNew = addMonths(secondMonth, action);
			setSecondMonth(secondNew);
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
	const helpers: DateHelpers = {
		inHighlight: (date) => {
			if (!startDate) {
				return false
			}

			if (endDate) {
				return date >= startDate && date <= endDate
			}

			if (!hoverDay) {
				return false
			}

			return (
				(date >= startDate && date <= hoverDay) ||
				(date >= hoverDay && date <= startDate)
			);
		},
		isStartDay: (date, includeHover) => {
			if (!startDate) {
				return false
			}

			if (includeHover && hoverDay && hoverDay < startDate) {
				return isSameDay(hoverDay, date)
			}

			return isSameDay(startDate, date)
		},
		isEndDay: (date, includeHover) => {
			if (includeHover && hoverDay && startDate) {
				return isSameDay(hoverDay >= startDate! ? hoverDay : startDate!, date)
			}

			return !!endDate && isSameDay(endDate, date)
		},
	};

	const handlers = {
		onDayClick,
		onDayHover,
		onMonthNavigate,
	};

	const canNavigateCloser = differenceInCalendarMonths(secondMonth, firstMonth) >= 2;

	const commonProps = {
		locale,
		minDate,
		maxDate,
		helpers,
		handlers,
	};

	return (
		<div className={classes.root}>
			<Month
				{...commonProps}
				value={firstMonth}
				navState={[true, canNavigateCloser]}
				marker={MARKERS.FIRST_MONTH}
			/>

			<Divider flexItem orientation='vertical' />

			<Month
				{...commonProps}
				value={secondMonth}
				navState={[canNavigateCloser, true]}
				marker={MARKERS.SECOND_MONTH}
			/>
		</div>
	);
};

export default DateRangePicker;
