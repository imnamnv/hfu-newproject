import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, makeStyles, Paper, Typography } from '@material-ui/core';
import ProductApi from '../../../api/productApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductListComponent from '../components/ProductList';
import { Pagination } from '@material-ui/lab';
import ProductSort from '../components/ProductSort';

const useStyles = makeStyles((theme) => ({
  root: {},
  left: {
    width: '250px',
  },
  right: {
    flex: '1 1 0',
  },
  pagination: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',

    marginTop: '30px',
    paddingBottom: '30px',
  },
}));

const ProductList = (props) => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    limit: 1,
    total: 1,
    page: 1,
  });

  const [filters, setFilters] = useState({
    _page: 1,
    _limit: 10,
    _sort: 'salePrice:ASC',
  });
  useEffect(() => {
    (async () => {
      try {
        const response = await ProductApi.getAll(filters);
        setProductList(response.data);
        setPagination(response.pagination);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    })();
    return () => {
      // cleanup;
    };
  }, [filters]);

  const handlePagination = (e, page) => {
    setFilters((preState) => ({
      ...preState,
      _page: page,
    }));
  };

  const handleSort = (value) => {
    setFilters((preState) => ({
      ...preState,
      _sort: value,
    }));
  };
  const classes = useStyles();
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>1</Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={filters._sort} onChange={handleSort}></ProductSort>

              {loading ? <ProductSkeletonList /> : <ProductListComponent products={productList} />}

              <div className={classes.pagination}>
                <Pagination
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePagination}
                  variant="outlined"
                  color="primary"
                ></Pagination>
              </div>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

ProductList.propTypes = {};

export default ProductList;
