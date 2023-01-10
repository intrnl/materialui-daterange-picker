import * as React from 'react';

import { makeStyles, IconButton, Typography } from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';

import { format, type Locale } from 'date-fns';

const useStyles = makeStyles(() => ({
	header: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	button: {
		height: 36,
		width: 36,
		padding: 8,
	},
	label: {
		marginTop: 4,
	},
}));

interface HeaderProps {
	date: Date;
	locale?: Locale;
	nextDisabled: boolean;
	prevDisabled: boolean;
	onClickNext: () => void;
	onClickPrevious: () => void;
}

const Header = (props: HeaderProps) => {
	const { date, locale, nextDisabled, prevDisabled, onClickNext, onClickPrevious } = props;

	const classes = useStyles();

	const label = React.useMemo(() => {
		return format(date, 'MMMM yyyy', { locale });
	}, [locale, date]);

	return (
		<div className={classes.header}>
			<IconButton disabled={prevDisabled} onClick={onClickPrevious} className={classes.button}>
				<ChevronLeft />
			</IconButton>

			<Typography color='textSecondary' variant='subtitle2' className={classes.label}>
				{label}
			</Typography>

			<IconButton disabled={nextDisabled} onClick={onClickNext} className={classes.button}>
				<ChevronRight />
			</IconButton>
		</div>
	);
};

export default Header;
