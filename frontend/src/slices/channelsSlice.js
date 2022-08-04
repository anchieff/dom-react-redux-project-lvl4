import axios from 'axios';
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit';
import routes from '../routes.js';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (Boolean(user) && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }
  return {};
};

export const fetchData = createAsyncThunk('channels/fetchData', async () => {
  const { data } = await axios.get(routes.getDataPath(), {
    headers: getAuthHeader(),
  });
  return data;
});

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    setChannels: channelsAdapter.addMany,
    addChannel: channelsAdapter.addOne,
    removeChannel: channelsAdapter.removeOne,
    updateChannel: channelsAdapter.updateOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      const { channels } = payload;
      // eslint-disable-line no-param-reassign
      state.entities = {};
      channels.forEach((item) => {
        // eslint-disable-line no-param-reassign
        state.entities[item.id] = item;
      });
      // eslint-disable-line no-param-reassign
      state.ids = Object.keys(state.entities);
    });
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels,
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
