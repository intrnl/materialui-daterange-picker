import * as React from 'react';

import { makeStyles, Typography } from '@material-ui/core';

import { format, getDate, isSameMonth, isToday, startOfWeek, type Locale, startOfMonth, endOfMonth, isBefore, addDays } from 'date-fns';

import Day from './Day';
import Header from './Header';

import { NavigationAction, type DateHelpers } from '../types';
import { chunked } from '../utils';


const useStyles = makeStyles(() => ({
	root: {
		display: 'flex',
		flexDirection: 'column',
		gap: 4,
	},
	grid: {
		display: 'grid',
		gap: 4,
		gridTemplateColumns: 'repeat(7, 1fr)',
		gridTemplateRows: 'repeat(1, 36px)',
		justifyItems: 'center',
	},
	dayLabel: {
		lineHeight: '36px',
	},
}));

interface MonthProps {
	value: Date;
	locale?: Locale;
	marker: symbol;
	minDate?: Date | number;
	maxDate?: Date | number;
	navState: [boolean, boolean];
	helpers: DateHelpers;
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

	const weeks = React.useMemo(() => {
		const startWeek = startOfWeek(startOfMonth(date), { locale });
		const endMonth = endOfMonth(date);

		const arr = [];
		for (let curr = startWeek; isBefore(curr, endMonth);) {
			arr.push(curr);
			curr = addDays(curr, 1);
		}

		const chunks = chunked(arr, 7);
		while (chunks.length < 6) chunks.push([])

		return chunks
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
			</div>

			{weeks.map((week, idx) => {
				const end = week.length - 1;
				let offset = 1;

				return (
					<div key={idx} className={classes.grid}>
						{week.map((day, idx) => {
							if (!isSameMonth(date, day)) {
								offset += 1;
								return null;
							}

							const isStart = helpers.isStartDay(day, false);
							const isEnd = helpers.isEndDay(day, false);
							const highlighted = helpers.inHighlight(day);

							const startPos = offset;
							const isRoundedStart = startPos > 1 || idx === 0;
							const isRoundedEnd = idx === end;

							offset = 0;

							return (
								<Day
									key={idx}
									filled={isStart || isEnd}
									outlined={isToday(day)}
									highlighted={highlighted}
									start={isRoundedStart || helpers.isStartDay(day, true)}
									end={isRoundedEnd || helpers.isEndDay(day, true)}
									disabled={(minDate != null && day >= minDate) && (maxDate != null && day <= maxDate)}
									onClick={() => handlers.onDayClick(day)}
									onHover={() => handlers.onDayHover(day)}
									value={getDate(day)}
									style={startPos > 1 ? { gridColumnStart: startPos } : undefined}
								/>
							);
						})}
					</div>
				)
			})}
		</div>
	);
};

export default Month;
