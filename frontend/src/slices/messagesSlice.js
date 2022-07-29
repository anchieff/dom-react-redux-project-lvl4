import { createSlice, createEntityAdapter } from "@reduxjs/toolkit";
import { fetchData } from "./channelsSlice.js";

const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    setMessages: messagesAdapter.addMany,
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchData.fulfilled, (state, { payload }) => {
      const { messages } = payload;
      state.entities = {};
      messages.forEach((item) => {
        state.entities[item.id] = item;
      });
      state.ids = Object.keys(state.entities);
    });
  },
});

export const selectors = messagesAdapter.getSelectors(
  (state) => state.messages
);
export const { actions } = messagesSlice;
export default messagesSlice.reducer;
