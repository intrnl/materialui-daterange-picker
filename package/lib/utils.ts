import {
	addDays,
	addMonths,
	endOfMonth,
	isBefore,
	isSameDay,
	isSameMonth,
	isWithinInterval,
	max,
	min,
	startOfMonth,
	startOfWeek,
} from 'date-fns';

import { type DateRange } from './types';


export const identity = <T>(x: T) => x;

export const combine = (...args: any[]): string => args.filter(identity).join(' ');

// Date
export const getDaysInMonth = (date: Date) => {
	const startWeek = startOfWeek(startOfMonth(date));
	const endMonth = endOfMonth(date);

	const days = [];
	for (let curr = startWeek; isBefore(curr, endMonth);) {
		days.push(curr);
		curr = addDays(curr, 1);
	}

	return days;
};

export const isStartOfRange = ({ startDate }: DateRange, day: Date) => (
	(startDate && isSameDay(day, startDate)) as boolean
);

export const isEndOfRange = ({ endDate }: DateRange, day: Date) => (
	(endDate && isSameDay(day, endDate)) as boolean
);

export const inDateRange = ({ startDate, endDate }: DateRange, day: Date) => {
	return (
		startDate && endDate && (
			isWithinInterval(day, { start: startDate, end: endDate })
			|| isSameDay(day, startDate)
			|| isSameDay(day, endDate)
		)
	) as boolean;
};

export const isRangeSameDay = ({ startDate, endDate }: DateRange) => {
	if (startDate && endDate) {
		return isSameDay(startDate, endDate);
	}
	return false;
};

type Falsy = false | null | undefined | 0 | '';

export const parseOptionalDate = (date: Date | string | Falsy, defaultValue: Date) => {
	if (date) {
		const parsed = new Date(date);

		if (!Number.isNaN(parsed)) {
			return parsed;
		}
	}
	return defaultValue;
};

export const getValidatedMonths = (range: DateRange, minDate: Date, maxDate: Date) => {
	const { startDate, endDate } = range;

	if (startDate && endDate) {
		const newStart = max([startDate, minDate]);
		const newEnd = min([endDate, maxDate]);

		return [newStart, isSameMonth(newStart, newEnd) ? addMonths(newStart, 1) : newEnd];
	}
	return [startDate, endDate];
};
