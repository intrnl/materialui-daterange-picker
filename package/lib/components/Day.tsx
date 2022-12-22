import * as React from 'react';

import { makeStyles, IconButton, Typography } from '@material-ui/core';

import { combine } from '../utils';


const useStyles = makeStyles((theme) => ({
	buttonContainer: {
		display: 'flex',
	},
	button: {
		height: 36,
		width: 36,
		padding: 0,
	},
	buttonText: {
		lineHeight: 1.6,
	},
	outlined: {
		border: `1px solid ${theme.palette.primary.dark}`,
	},
	filled: {
		backgroundColor: theme.palette.primary.dark,
		
		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	highlighted: {
		backgroundColor: theme.palette.action.hover,
	},
	contrast: {
		color: theme.palette.primary.contrastText,
	},
}));

interface DayProps {
	filled?: boolean;
	outlined?: boolean;
	highlighted?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	value: number | string;
}

const Day = (props: DayProps) => {
	const { disabled, highlighted, outlined, filled, onClick, onHover, value } = props;

	const classes = useStyles();

	return (
		<div
			className={combine(
				classes.buttonContainer,
				!disabled && highlighted && classes.highlighted,
			)}
		>
			<IconButton
				className={combine(
					classes.button,
					!disabled && outlined && classes.outlined,
					!disabled && filled && classes.filled,
				)}
				disabled={disabled}
				onClick={onClick}
				onMouseOver={onHover}
			>
				<Typography
					color={!disabled ? 'textPrimary' : 'textSecondary'}
					className={combine(
						classes.buttonText,
						!disabled && filled && classes.contrast,
					)}
					variant='body2'
				>
					{value}
				</Typography>
			</IconButton>
		</div>
	);
};

export default Day;
