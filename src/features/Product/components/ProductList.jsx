import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import Product from './Product';

const ProductSkeletonList = (props) => {
  const { products } = props;

  return (
    <Box>
      <Grid container>
        {products.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

ProductSkeletonList.propTypes = {
  products: PropTypes.array,
};
ProductSkeletonList.defaultProps = {
  products: [],
};

export default ProductSkeletonList;
