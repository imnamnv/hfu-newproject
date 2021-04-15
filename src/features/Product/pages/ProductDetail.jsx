import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductInfo from '../components/ProductInfo';
import { TheatersRounded } from '@material-ui/icons';
import { useRouteMatch } from 'react-router';
import useProductDetail from '../hooks/useProductDetail';

const useStyle = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
    padding: theme.spacing(2),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },
  right: {
    padding: theme.spacing(2),
    flex: '1 1 0',
  },
}));

const ProductDetail = (props) => {
  const classes = useStyle();

  const match = useRouteMatch();
  const productId = match.params.productId;

  const { product, loading } = useProductDetail(productId);

  if (loading === true) {
    return <Box>Loading</Box>;
  }

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>
            <Grid item className={classes.right}>
              <ProductInfo product={product} />
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
