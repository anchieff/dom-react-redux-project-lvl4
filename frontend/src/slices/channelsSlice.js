import axios from "axios";
import {
  createAsyncThunk,
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import routes from "../routes.js";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchData = createAsyncThunk("channels/fetchData", async () => {
  const { data } = await axios.get(routes.getDataPath(), {
    headers: getAuthHeader(),
  });
  return data;
});

const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState();

const channelsSlice = createSlice({
  name: "channels",
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
      state.entities = {};
      channels.forEach((item) => {
        state.entities[item.id] = item;
      });
      state.ids = Object.keys(state.entities);
    });
  },
});

export const selectors = channelsAdapter.getSelectors(
  (state) => state.channels
);
export const { actions } = channelsSlice;
export default channelsSlice.reducer;
