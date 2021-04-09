import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs } from '@material-ui/core';

const ProductSort = ({ currentSort, onChange }) => {
  const handleOnchange = (e, value) => {
    if (onChange) {
      onChange(value);
    }
  };
  return (
    <Tabs
      value={currentSort}
      indicatorColor="primary"
      textColor="primary"
      onChange={handleOnchange}
    >
      <Tab label="Thấp đến cao" value="salePrice:ASC" />
      <Tab label="Cao đến thấp" value="salePrice:DESC" />
    </Tabs>
  );
};

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

export default ProductSort;
