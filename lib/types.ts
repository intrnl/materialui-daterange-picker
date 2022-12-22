export interface DateRange {
	startDate?: Date;
	endDate?: Date;
}

export type Setter<T> = React.Dispatch<React.SetStateAction<T>> | ((value: T) => void);

export enum NavigationAction {
	Previous = -1,
	Next = 1,
}

export interface DateHelpers {
	inHighlight: (date: Date) => boolean;
	isStartDay: (date: Date, includeHover: boolean) => boolean;
	isEndDay: (date: Date, includeHover: boolean) => boolean;
}
