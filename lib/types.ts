export interface DateRange {
	startDate?: Date;
	endDate?: Date;
}

export enum NavigationAction {
	Previous = -1,
	Next = 1,
}

export interface DateHelpers {
	inHighlight: (date: Date) => boolean;
	isStartDay: (date: Date, includeHover: boolean) => boolean;
	isEndDay: (date: Date, includeHover: boolean) => boolean;
}
