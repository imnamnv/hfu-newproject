import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { Route, Switch, useRouteMatch } from 'react-router';
import ProductList from './pages/ProductList';
import ProductDetail from './pages/ProductDetail';

const Product = (props) => {
  const match = useRouteMatch();
  return (
    <Box pt={2}>
      <Switch>
        <Route path={match.url} exact component={ProductList}></Route>
        <Route path={`${match.url}/:productId`} component={ProductDetail}></Route>
      </Switch>
    </Box>
  );
};

Product.propTypes = {};

export default Product;
