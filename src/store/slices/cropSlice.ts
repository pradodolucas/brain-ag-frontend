import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { callApi } from "@/libs/utils/webservice";
import { CropProps } from "@/types/crop";

interface CropState {
  data: CropProps[];
  loading: boolean;
  error: string | null;
  lastFetch: number | null;
}

const initialState: CropState = {
  data: [],
  loading: false,
  error: null,
  lastFetch: null,
};

export const fetchCrops = createAsyncThunk<
  CropProps[],
  { force?: boolean },
  { state: { crops: CropState } }
>("crops/fetchCrops", async ({ force = false }, { getState }) => {
  const { lastFetch } = getState().crops;
  const now = Date.now();

  if (!force && lastFetch && now - lastFetch < 5 * 60 * 1000) {
    const { data } = getState().crops;
    return data;
  }

  const res = await callApi("crop/recent/3", {}, "GET");
  return res.data;
});

export const cropSlice = createSlice({
  name: "crops",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrops.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCrops.fulfilled,
        (state, action: PayloadAction<CropProps[]>) => {
          state.data = action.payload;
          state.loading = false;
          state.lastFetch = Date.now();
        }
      )
      .addCase(fetchCrops.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Erro ao carregar culturas";
      });
  },
});

export default cropSlice.reducer;
