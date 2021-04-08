import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import userApi from '../../api/userApi';
import StorageKeys from '../../constants/storage-keys';

export const login = createAsyncThunk('user/login', async (payload) => {
  //create a action creator that help create aciton Object
  //THen, when dispath. this will call pending. then if success will run async function
  //async function will return promise. if success will dispatch fulfilled reducer. if not, run reject reducer

  //call apl
  const data = await userApi.login(payload);
  localStorage.setItem(StorageKeys.TOKEN, data.jwt);
  localStorage.setItem(StorageKeys.USER, JSON.stringify(data.user));

  //save data to localstorage
  return data.user; // return userData
});

const userSlice = createSlice({
  name: 'user',
  initialState: {
    current: JSON.parse(localStorage.getItem(StorageKeys.USER)) || {},
    setting: {},
  },
  reducers: {
    logout(state) {
      localStorage.removeItem(StorageKeys.USER);
      localStorage.removeItem(StorageKeys.TOKEN);
      state.current = {};
    },
  },
  extraReducers: {
    [login.fulfilled]: (state, action) => {
      state.current = action.payload; // action.payload is data of createAsyncThunk
    },
  },
});

const { actions, reducer } = userSlice;
export const { logout } = actions;
export default reducer;
