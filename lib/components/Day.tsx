import { makeStyles, IconButton, Typography } from '@material-ui/core';

import { combine } from '../utils';


const useStyles = makeStyles((theme) => ({
	start: {
    borderTopLeftRadius: '50%',
    borderBottomLeftRadius: '50%'
  },
  end: {
    borderTopRightRadius: '50%',
    borderBottomRightRadius: '50%'
  },
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
		border: `1px solid ${theme.palette.text.primary}`,
	},
	filled: {
		backgroundColor: theme.palette.primary.main,

		'&:hover': {
			backgroundColor: theme.palette.primary.dark,
		},
	},
	highlighted: {
		backgroundColor: theme.palette.action.focus,

		'&:first-of-type, div:empty + &': {
      borderTopLeftRadius: '50%',
      borderBottomLeftRadius: '50%'
    },
    '&:last-of-type': {
      borderTopRightRadius: '50%',
      borderBottomRightRadius: '50%'
    },
	},
	contrast: {
		color: theme.palette.primary.contrastText,
	},
}));

interface DayProps {
	filled?: boolean;
	outlined?: boolean;
	highlighted?: boolean;
	start?: boolean;
	end?: boolean;
	disabled?: boolean;
	onClick?: () => void;
	onHover?: () => void;
	value: number | string;
}

const Day = (props: DayProps) => {
	const {
		filled,
		outlined,
		highlighted,
		start,
		end,
		disabled,
		onClick,
		onHover,
		value,
	} = props;

	const classes = useStyles();

	return (
		<div
			className={combine(
				classes.buttonContainer,
				!disabled && highlighted && classes.highlighted,
				start && classes.start,
        end && classes.end,
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
