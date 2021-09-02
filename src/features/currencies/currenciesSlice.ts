import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrencies } from "./currenciesAPI";

export interface Currency {
  currency: string;
  code: string;
  mid: number;
}

export interface CurrenciesState {
  currencies: Currency[];
  firstCurrency?: Currency;
  secondCurrency?: Currency;
  status: "idle" | "loading" | "failed" | "error";
}

const initialState: CurrenciesState = {
  currencies: [],
  firstCurrency: undefined,
  secondCurrency: undefined,
  status: "idle",
};

export const fetchCurrenciesData = createAsyncThunk("currencies/fetchCurrencies", async () => {
  const { data } = await fetchCurrencies();
  return data;
});

export const currenciesSlice = createSlice({
  name: "currencies",
  initialState,
  reducers: {
    setFirstCurrency: (state, action: PayloadAction<Currency | undefined>) => {
      state.firstCurrency = action.payload;
    },
    setSecondCurrency: (state, action: PayloadAction<Currency | undefined>) => {
      state.secondCurrency = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrenciesData.pending, state => {
        state.status = "loading";
      })
      .addCase(fetchCurrenciesData.fulfilled, (state, action) => {
        state.status = "idle";
        state.currencies = action.payload?.[0]?.rates;
        state.firstCurrency = action.payload?.[0]?.rates?.[0];
        state.secondCurrency = action.payload?.[0]?.rates?.[1];
      })
      .addCase(fetchCurrenciesData.rejected, state => {
        state.status = "error";
      });
  },
});

export const { setFirstCurrency, setSecondCurrency } = currenciesSlice.actions;

export default currenciesSlice.reducer;
