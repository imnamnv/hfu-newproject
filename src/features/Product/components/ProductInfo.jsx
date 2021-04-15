import React from 'react';
import PropTypes from 'prop-types';
import { Box, makeStyles, Typography } from '@material-ui/core';
import { formatPrice } from '../../../utils/common,';

const useStyle = makeStyles((theme) => ({
  root: {},
  boxPrice: {
    display: 'flex',
    flexFlow: 'row nowrap',
  },
  salePrice: {
    margin: theme.spacing(2, 0),
  },
  originalPrice: { textDecoration: 'line-through', margin: theme.spacing(2, 1) },
  promotionPercent: { margin: theme.spacing(2, 1) },
}));

const ProductInfo = ({ product = {} }) => {
  const { originalPrice, promotionPercent, salePrice, shortDescription } = product;
  const classes = useStyle();
  return (
    <Box className={classes.root}>
      <Typography>{shortDescription}</Typography>
      {
        <Box className={classes.boxPrice}>
          <Typography className={classes.salePrice}>{formatPrice(salePrice)}</Typography>
          {promotionPercent > 0 && (
            <>
              <Typography className={classes.originalPrice}>
                {formatPrice(originalPrice)}
              </Typography>
              <Typography
                className={classes.promotionPercent}
              >{`-${promotionPercent}%`}</Typography>
            </>
          )}
        </Box>
      }
    </Box>
  );
};

ProductInfo.propTypes = {
  product: PropTypes.object,
};

export default ProductInfo;
