/* eslint-disable radix */

import {
  makeStyles,
  IconButton,
  Typography,
} from '@material-ui/core';
import React from 'react';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import {format} from 'date-fns';

const useStyles = makeStyles(() => ({
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 16,
    marginRight: 16,
  },
  button: {
    height: 36,
    width: 36,
    padding: 8,
  },
  label: {
    marginTop: 4,
  }
}));

interface HeaderProps {
  date: Date;
  nextDisabled: boolean;
  prevDisabled: boolean;
  onClickNext: () => void;
  onClickPrevious: () => void;
}

const Header: React.FunctionComponent<HeaderProps> = ({
  date,
  nextDisabled,
  prevDisabled,
  onClickNext,
  onClickPrevious,
}: HeaderProps) => {

  const classes = useStyles();

  const label = React.useMemo(() => format(date, 'MMMM yyyy'), [date])

  return (
    <div className={classes.header}>
      <IconButton disabled={prevDisabled} onClick={onClickPrevious} className={classes.button}>
        <ChevronLeft  />
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
