import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/libs/utils/webservice";
import { ProducerProps } from "@/types/producer";

interface ProducersState {
  data: ProducerProps[];
  lastFetch: number | null;
  loading: boolean;
  fetching: boolean;
  error: string | null;
}

const initialState: ProducersState = {
  data: [],
  lastFetch: null,
  loading: true,
  fetching: false,
  error: null,
};

export const fetchProducers = createAsyncThunk(
  "producers/fetch",
  async (force: boolean | undefined, { getState, rejectWithValue }) => {
    const state = getState() as any;
    const { producers } = state;
    const now = Date.now();
    const TEN_MINUTES = 10 * 60 * 1000;

    if (
      !force &&
      producers.lastFetch &&
      now - producers.lastFetch < TEN_MINUTES
    ) {
      return producers.data as ProducerProps[];
    }

    try {
      const res = await callApi("producer", {}, "GET");
      return res.data as ProducerProps[];
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const producersSlice = createSlice({
  name: "producers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducers.pending, (state) => {
        state.fetching = true;
        state.error = null;
      })
      .addCase(
        fetchProducers.fulfilled,
        (state, action: PayloadAction<ProducerProps[]>) => {
          state.data = action.payload;
          state.lastFetch = Date.now();
          state.fetching = false;
          state.loading = false;
        }
      )
      .addCase(fetchProducers.rejected, (state, action) => {
        state.fetching = false;
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default producersSlice.reducer;
