import { Box, Container, Grid, LinearProgress, makeStyles, Paper } from '@material-ui/core';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router';
import AddToCartForm from '../components/AddToCartForm';
import ProductDetailMenu from '../components/ProductDetailMenu';
import ProductDetailAdditional from '../components/ProductDetailMenu/ProductDetailAdditional';
import ProductDetailDescription from '../components/ProductDetailMenu/ProductDetailDescription';
import ProductDetailReviews from '../components/ProductDetailMenu/ProductDetailReviews';
import ProductInfo from '../components/ProductInfo';
import ProductThumbnail from '../components/ProductThumbnail';
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
  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));

const ProductDetail = (props) => {
  const classes = useStyle();

  const match = useRouteMatch();
  const productId = match.params.productId;

  const { product, loading } = useProductDetail(productId);

  if (loading === true) {
    return (
      <Box classes={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleToSubmit = (value) => {
    console.log(value);
  };

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
              <AddToCartForm onSubmit={handleToSubmit} />
            </Grid>
          </Grid>
        </Paper>
        <Paper elevation={0}>
          <Container>
            <ProductDetailMenu />

            <Switch>
              <Route exact path={match.url}>
                <ProductDetailDescription product={product} />
              </Route>
              <Route exact path={`${match.url}/additional`}>
                <ProductDetailAdditional />
              </Route>
              <Route exact path={`${match.url}/reviews`}>
                <ProductDetailReviews />
              </Route>
            </Switch>
          </Container>
        </Paper>
      </Container>
    </Box>
  );
};

ProductDetail.propTypes = {};

export default ProductDetail;
