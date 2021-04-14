import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, makeStyles, TextField, Typography } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(2),
  },
  range: {
    display: 'flex',
    alignItems: 'center',

    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    '& > span': {
      paddingLeft: theme.spacing(1),
      paddingRight: theme.spacing(1),
    },
  },
}));
const FilterByPrice = ({ onChange }) => {
  const classes = useStyle();
  const [values, setValues] = useState({
    salePrice_gte: 0,
    salePrice_lte: 0,
  });
  const handleOnSubmit = () => {
    if (!onChange) return;
    onChange(values);
  };
  const handleChange = (e) => {
    setValues((prevValue) => ({
      ...prevValue,
      [e.target.name]: e.target.value,
    }));
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Giá</Typography>
      <Box className={classes.range}>
        <TextField name="salePrice_gte" value={values.salePrice_gte} onChange={handleChange} />
        <span>-</span>
        <TextField name="salePrice_lte" value={values.salePrice_lte} onChange={handleChange} />
      </Box>
      <Button variant="outlined" color="primary" size="small" onClick={handleOnSubmit}>
        Áp dụng
      </Button>
    </Box>
  );
};

FilterByPrice.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByPrice;
