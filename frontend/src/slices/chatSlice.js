import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import routes from "../routes.js";

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem("userId"));
  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }
  return {};
};

export const fetchData = createAsyncThunk("chat/fetchData", async () => {
  const { data } = await axios.get(routes.getDataPath(), {
    headers: getAuthHeader(),
  });
  return data;
});

const initialState = {
  channels: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      state.channels = payload.channels;
      state.currentChannelId = payload.currentChannelId;
      state.messages = payload.messages;
    });
  },
});

export default chatSlice.reducer;
