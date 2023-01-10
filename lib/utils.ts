import {
	addMonths,
	isSameMonth,
	max,
	min,
} from 'date-fns';

import { type DateRange } from './types';


export const chunked = <T>(array: ReadonlyArray<T>, size: number): T[][] => {
	const result: T[][] = [];
	const length = Math.ceil(array.length / size);

	for (let i = 0; i < length; i++) {
		result.push(array.slice(i * size, i * size + size));
	}

	return result;
}

export const combine = (...args: any[]): string => {
	let str = '';

	for (let idx = 0, len = args.length; idx < len; idx++) {
		let val = args[idx];

		if (val) {
			str && (str += ' ');
			str += val;
		}
	}

	return str;
};

// Date
export const parseOptionalDate = (date: Date | number | undefined, defaultValue: Date) => {
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
