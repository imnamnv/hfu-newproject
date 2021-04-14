import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';

import categoryApi from '../../../../api/categoryApi';

const useStyle = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  menu: {
    padding: 0,
    margin: 0,
    listStyleType: 'none',
    '& >li': {
      marginTop: theme.spacing(1),
      '&:hover': {
        color: theme.palette.primary.dark,
        cursor: 'pointer',
      },
    },
  },
}));

const FilterByCategory = ({ onChange }) => {
  const classes = useStyle();
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await categoryApi.getAll();
        console.log(response);
        setCategoryList(
          response.map((x) => ({
            id: x.id,
            name: x.name,
          }))
        );
      } catch (error) {
        console.log('Failed to fetch  category list', error);
      }
    })();
    return () => {};
  }, []);

  const handleCategoryClick = (category) => {
    if (onChange) {
      onChange(category.id);
    }
  };
  return (
    <Box className={classes.root}>
      <Typography variant="subtitle2">Danh muc san pham</Typography>
      <ul className={classes.menu}>
        {categoryList.map((category) => (
          <li onClick={() => handleCategoryClick(category)} key={category.id}>
            <Typography variant="body2">{category.name}</Typography>
          </li>
        ))}
      </ul>
    </Box>
  );
};

FilterByCategory.propTypes = {
  onChange: PropTypes.func,
};

export default FilterByCategory;
