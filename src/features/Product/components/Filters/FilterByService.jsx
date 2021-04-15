import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  makeStyles,
  TextField,
  Typography,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    borderTop: `1px solid ${theme.palette.grey[500]}`,
    padding: theme.spacing(2),
  },
  service: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),

    padding: 0,
    listStyleType: 'none',
  },
}));
const FilterByService = ({ filters = {}, onChange }) => {
  const classes = useStyle();

  const handleChange = (e) => {
    if (!onChange) return;
    onChange({ [e.target.name]: Boolean(e.target.checked) });
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Dịch vụ</Typography>
      <ul className={classes.service}>
        {[
          { key: 'isPromotion', name: 'Có khuyến mãi' },
          { key: 'isFreeShip', name: 'Giao hàng miễn phí' },
        ].map((service) => (
          <li key={service.key}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(filters[service.key])}
                  onChange={handleChange}
                  name={service.key}
                  color="primary"
                />
              }
              label={service.name}
            />
          </li>
        ))}
      </ul>
    </Box>
  );
};

FilterByService.propTypes = {
  onChange: PropTypes.func,
  filters: PropTypes.object,
};

export default FilterByService;
