import { Box, Container, Grid, makeStyles, Paper } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import queryString from 'querystring';
import React, { useEffect, useMemo, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import ProductApi from '../../../api/productApi';
import FilterViewer from '../components/FilterViewer';
import ProductFilters from '../components/ProductFilters';
import ProductListComponent from '../components/ProductList';
import ProductSkeletonList from '../components/ProductSkeletonList';
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
  const classes = useStyles();

  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search.substring(1));
    return {
      ...params,
      _page: +params._page || 1,
      _limit: +params._limit || 10,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
    };
  }, [location.search]);

  const [pagination, setPagination] = useState({
    limit: 1,
    total: 1,
    page: 1,
  });

  // const [filters, setFilters] = useState(() => ({
  //   ...queryParams,
  //   _page: +queryParams._page || 1,
  //   _limit: +queryParams._limit || 10,
  //   _sort: queryParams._sort || 'salePrice:ASC',
  // }));
  // console.log('filters: ', filters);

  const [categoryName, setCategoryName] = useState('');

  // useEffect(() => {
  //   history.push({
  //     pathname: history.location.pathname,
  //     search: queryString.stringify(filters),
  //   });
  //   return () => {
  //     // cleanup;
  //   };
  // }, [history, filters]);

  useEffect(() => {
    (async () => {
      try {
        const response = await ProductApi.getAll(queryParams);
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
  }, [queryParams]);

  const handlePagination = (e, page) => {
    // setFilters((preState) => ({
    //   ...preState,
    //   _page: page,
    // }));

    const filters = {
      ...queryParams,
      _page: page,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSort = (value) => {
    // setFilters((preState) => ({
    //   ...preState,
    //   _sort: value,
    // }));

    const filters = {
      ...queryParams,
      _sort: value,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  const handleFiltersChange = (newFilters) => {
    if (newFilters['category.name']) {
      setCategoryName(newFilters['category.name']);
      delete newFilters['category.name'];
    }
    // setFilters((preState) => ({
    //   ...preState,
    //   ...newFilters,
    // }));

    const filters = {
      ...queryParams,
      ...newFilters,
    };
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1}>
          <Grid item className={classes.left}>
            <Paper elevation={0}>
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>
          <Grid item className={classes.right}>
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSort}></ProductSort>

              <FilterViewer
                categoryName={categoryName}
                onChange={handleFiltersChange}
                filters={queryParams}
              />

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
