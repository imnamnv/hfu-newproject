import React from 'react';
import PropTypes from 'prop-types';
import { Box, Link, makeStyles } from '@material-ui/core';
import { NavLink, useRouteMatch } from 'react-router-dom';

const useStyle = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    alignItems: 'center',
    justifyContent: 'center',

    padding: 0,
    listStyleType: 'none',

    '& >li': {
      padding: theme.spacing(0, 2),
    },

    '& > li > a': {
      color: theme.palette.grey[800],
    },

    '& > li > a.active': {
      color: 'red',
      textDecoration: 'underline',
    },
  },
}));
const ProductDetailMenu = (props) => {
  const useRoute = useRouteMatch();

  const classes = useStyle();
  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={useRoute.url} exact>
          Mô tả
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${useRoute.url}/additional`} exact>
          Bổ sung
        </Link>
      </li>
      <li>
        <Link component={NavLink} to={`${useRoute.url}/reviews`} exact>
          Nhận xét
        </Link>
      </li>
    </Box>
  );
};

ProductDetailMenu.propTypes = {};

export default ProductDetailMenu;
