import React, { useMemo } from 'react';
import PropTypes from 'prop-types';
import { Box, Chip, makeStyles } from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row wrap',
    alignItems: 'center',

    margin: theme.spacing(2, 2, 0, 2),
    listStyleType: 'none',

    '&>li': {
      margin: 0,
      padding: theme.spacing(1),
    },
  },
}));

const FILTER_LIST = [
  {
    id: 1,
    getLabel: () => 'Giao hàng miễn phí',
    isActive: (filters) => filters.isFreeShip,
    isVisible: () => true,
    isRemovable: false,
    onRemove: () => {},
    onToggle: (filters) => {
      const newFilters = {
        ...filters,
      };
      if (newFilters.isFreeShip) {
        newFilters.isFreeShip = false;
      } else {
        newFilters.isFreeShip = true;
      }
      return newFilters;
    },
  },
  {
    id: 2,
    getLabel: () => 'Có khuyễn mãi',
    isActive: (filters) => true,
    isVisible: (filters) => filters.isPromotion === true, //Object.keys(filters).includes('isPromotion') ||
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      newFilters.isPromotion = false;
      return newFilters;
    },
    onToggle: (filters) => null,
  },
  {
    id: 3,
    getLabel: (filters) => `Từ  ${filters.salePrice_gte} đến ${filters.salePrice_lte}`,
    isActive: (filters) => true,
    isVisible: (filters) => filters.salePrice_lte > 0 && filters.salePrice_gte > 0,
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      newFilters.salePrice_lte = 0;
      newFilters.salePrice_gte = 0;
      return newFilters;
    },
    onToggle: (filters) => null,
  },
  {
    id: 4,
    getLabel: (filters, categoryName) => {
      if (categoryName) return categoryName;
    },
    isActive: (filters) => true,
    isVisible: (filters) => Boolean(filters['category.id']),
    isRemovable: true,
    onRemove: (filters) => {
      const newFilters = { ...filters };
      newFilters['category.id'] = null;
      console.log(newFilters);
      return newFilters;
    },
    onToggle: (filters) => '',
  },
];
const FilterViewer = ({ filters = [], onChange = null, categoryName = '' }) => {
  const classes = useStyle();
  const visiableFilters = useMemo(() => {
    return FILTER_LIST.filter((x) => x.isVisible(filters));
  }, [filters]);
  return (
    <Box variant="ul" className={classes.root}>
      {visiableFilters.map((x) => (
        <li key={x.id}>
          <Chip
            label={x.getLabel(filters, categoryName)}
            color={x.isActive(filters) ? 'primary' : 'default'}
            clickable={!x.isRemovable}
            onClick={
              x.isRemovable
                ? null
                : () => {
                    if (!onChange) return;
                    console.log('old : ', filters);

                    const newFilters = x.onToggle(filters);
                    console.log('new : ', newFilters);
                    onChange(newFilters);
                  }
            }
            onDelete={
              x.isRemovable
                ? () => {
                    if (onChange) {
                      const newFilters = x.onRemove(filters);
                      onChange(newFilters);
                    }
                  }
                : null
            }
          />
        </li>
      ))}
    </Box>
  );
};

FilterViewer.propTypes = {
  filters: PropTypes.object,
  onChange: PropTypes.func,
  categoryName: PropTypes.string,
};

export default FilterViewer;
