import { Button, InputBase } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/Login/userSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    textAlign: 'left',
    padding: theme.spacing(0, 3),
  },
  link: {
    textDecoration: 'none',
    cursor: 'pointer',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#eeeeee', 1),
    '&:hover': {
      backgroundColor: fade('#eeeeee', 0.6),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  flexGrow: {
    flexGrow: 1,
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const location = useLocation();
  const dispatch = useDispatch();

  const loggedUser = useSelector((state) => state.user.current);
  const isLogged = !!loggedUser.id;
  console.log('IS LOGGED: ', isLogged);

  const handleLogut = () => {
    const action = logout();
    dispatch(action);
  };
  return (
    <div className={classes.root}>
      <AppBar color="inherit" position="static">
        <Toolbar p={2}>
          <Avatar>
            <Link to="/" className={classes.link}>
              H
            </Link>
          </Avatar>
          <Typography variant="h6" className={classes.title}>
            <Link to="/" className={classes.link}>
              Hiphop battle
            </Link>
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm kiếm sự kiện"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.flexGrow}></div>
          {location.pathname !== '/login' && !isLogged && (
            <Link to="/login" className={classes.link}>
              Đăng nhập
            </Link>
          )}
          {location.pathname !== '/register' && !isLogged && (
            <Link to="/register" className={classes.link}>
              Đăng ký
            </Link>
          )}
          {location.pathname === '/' && isLogged && (
            <Typography onClick={handleLogut} className={classes.link}>
              Đăng xuất
            </Typography>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
