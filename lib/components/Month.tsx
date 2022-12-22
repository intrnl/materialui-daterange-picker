import * as React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { format, getDate, isSameMonth, isToday, startOfWeek, type Locale, startOfMonth, endOfMonth, isBefore, addDays } from 'date-fns';

import Day from './Day';
import Header from './Header';

import { DateRange, NavigationAction } from '../types';
import { inDateRange, isEndOfRange, isRangeSameDay, isStartOfRange } from '../utils';


const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
	},
	grid: {
		display: 'grid',
		gridTemplateColumns: 'repeat(7, 1fr)',
		gridTemplateRows: 'repeat(7, 36px)',
		justifyItems: 'center',
		marginTop: 8,
	},
	dayLabel: {
		lineHeight: '36px',
	},
}));

interface MonthProps {
	value: Date;
	locale?: Locale;
	marker: symbol;
	dateRange: DateRange;
	minDate?: Date | number;
	maxDate?: Date | number;
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

const Month = (props: MonthProps) => {
	const classes = useStyles();

	const {
		helpers,
		handlers,
		value: date,
		locale,
		dateRange,
		marker,
		minDate,
		maxDate,
	} = props;

	const [back, forward] = props.navState;

	const weekDays = React.useMemo(() => {
		const date = startOfWeek(new Date(), { locale });
		const labels: string[] = [];

		const dayOfMonth = date.getDate();

		for (let i = 0; i < 7; i++) {
			date.setDate(dayOfMonth + i);
			labels.push(format(date, 'eeeeee', { locale }));
		}

		return labels;
	}, [locale]);

	const days = React.useMemo(() => {
		const startWeek = startOfWeek(startOfMonth(date), { locale });
		const endMonth = endOfMonth(date);
	
		const days = [];
		for (let curr = startWeek; isBefore(curr, endMonth);) {
			days.push(curr);
			curr = addDays(curr, 1);
		}
	
		return days;
	}, [locale, date]);

	return (
		<div className={classes.root}>
			<Header
				date={date}
				locale={locale}
				nextDisabled={!forward}
				prevDisabled={!back}
				onClickPrevious={() => handlers.onMonthNavigate(marker, NavigationAction.Previous)}
				onClickNext={() => handlers.onMonthNavigate(marker, NavigationAction.Next)}
			/>

			<div className={classes.grid}>
				{weekDays.map((day) => (
					<Typography color='textSecondary' key={day} variant='caption' className={classes.dayLabel}>
						{day}
					</Typography>
				))}

				{days.map((day, idx) => {
					if (!isSameMonth(date, day)) {
						return <div key={idx} />;
					}

					const isStart = isStartOfRange(dateRange, day);
					const isEnd = isEndOfRange(dateRange, day);
					const isRangeOneDay = isRangeSameDay(dateRange);
					const highlighted = inDateRange(dateRange, day) || helpers.inHoverRange(day);

					return (
						<Day
							key={idx}
							filled={isStart || isEnd}
							outlined={isToday(day)}
							highlighted={highlighted && !isRangeOneDay}
							disabled={(minDate != null && day >= minDate) && (maxDate != null && day <= maxDate)}
							onClick={() => handlers.onDayClick(day)}
							onHover={() => handlers.onDayHover(day)}
							value={getDate(day)}
						/>
					);
				})}
			</div>
		</div>
	);
};

export default Month;
