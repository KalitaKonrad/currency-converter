import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchCurrencies } from "./currenciesAPI";

export interface Currency {
  currency: string;
  code: string;
  mid: number;
  date: string;
}

export interface CurrenciesState {
  currencies: Currency[];
  date: Date;
  status: "idle" | "loading" | "failed" | "error";
}

const initialState: CurrenciesState = {
  currencies: [],
  date: new Date(),
  status: "idle",
};

export const fetchCurrenciesData = createAsyncThunk("currencies/fetchCurrencies", async () => {
  const { data } = await fetchCurrencies();
  return data;
});

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCurrenciesData.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchCurrenciesData.fulfilled, (state, action) => {
        state.status = "idle";
        const rates = action.payload?.[0]?.rates;
        const date = action.payload?.[0].effectiveDate;
        state.currencies = rates;
        state.date = date;
      })
      .addCase(fetchCurrenciesData.rejected, state => {
        state.status = "error";
      });
  },
});

export default currenciesSlice.reducer;
