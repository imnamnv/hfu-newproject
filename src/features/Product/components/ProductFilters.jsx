import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import FilterByCategory from './Filters/FilterByCategory';
import FilterByPrice from './Filters/FilterByPrice';
import FilterByService from './Filters/FilterByService';

const ProductFilters = ({ filters, onChange }) => {
  const handleCategoryChange = (newCategoryId, newCategoryName) => {
    if (!onChange) return;

    const newFilters = {
      'category.id': newCategoryId,
      'category.name': newCategoryName,
    };
    onChange(newFilters);
  };
  const handleChange = (values) => {
    if (!onChange) return;

    const newFilters = {
      ...values,
    };
    onChange(newFilters);
  };
  return (
    <Box>
      <FilterByCategory onChange={handleCategoryChange} />
      <FilterByPrice onChange={handleChange} />
      <FilterByService filters={filters} onChange={handleChange} />
    </Box>
  );
};

ProductFilters.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
};

export default ProductFilters;
