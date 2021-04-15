import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from '../../../constants';

const ProductThumbnail = ({ product = {} }) => {
  console.log(product);
  const thumbnail = product.thumbnail?.url
    ? STATIC_HOST + product.thumbnail.url
    : THUMBNAIL_PLACEHOLDER;
  return (
    <Box>
      <img src={thumbnail} alt={product.name} width="100%" />
    </Box>
  );
};

ProductThumbnail.propTypes = {
  product: PropTypes.object,
};

export default ProductThumbnail;
