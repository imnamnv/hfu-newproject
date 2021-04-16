import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@material-ui/core';

import DOMPurify from 'dompurify';

const ProductDetailDescription = ({ product }) => {
  var cleanProductDescription = DOMPurify.sanitize(product.description);

  return <Box dangerouslySetInnerHTML={{ __html: cleanProductDescription }}></Box>;
};

ProductDetailDescription.propTypes = {
  product: PropTypes.object,
};

export default ProductDetailDescription;
