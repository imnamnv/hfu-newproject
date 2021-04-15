import React from 'react';
import PropTypes from 'prop-types';
import { Box, Grid, Typography } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';
import { useHistory } from 'react-router';

const Product = (props) => {
  const { product } = props;

  const history = useHistory();
  const thumbnail = product.thumbnail?.url
    ? STATIC_HOST + product.thumbnail.url
    : THUMBNAIL_PLACEHOLDER;

  const handleClickProduct = () => {
    history.push({
      pathname: `/products/${product.id}`,
    });
  };
  return (
    <Box padding={1} onClick={handleClickProduct}>
      <Box p={1}>
        <img src={thumbnail} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold">
          {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(
            product.salePrice
          )}
        </Box>

        {product.promotionPercent > 0 ? ` -${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
};

Product.propTypes = {
  product: PropTypes.object,
};
Product.defaultProps = {
  product: {},
};

export default Product;
