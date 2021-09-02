import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCurrencies } from "./currenciesAPI";

export interface Currency {
  currency: string;
  code: string;
  mid: number;
}

export enum Status {
  IDLE = "idle",
  LOADING = "loading",
  FAILED = "failed",
  ERROR = "error",
}

export interface CurrenciesState {
  currencies: Currency[];
  firstCurrency?: Currency;
  secondCurrency?: Currency;
  baseCurrency?: Currency;
  currencyTableAmount: number;
  status: Status;
}

const initialState: CurrenciesState = {
  currencies: [],
  firstCurrency: undefined,
  secondCurrency: undefined,
  baseCurrency: undefined,
  currencyTableAmount: 0,
  status: Status.IDLE,
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
    setBaseCurrency: (state, action: PayloadAction<Currency | undefined>) => {
      state.baseCurrency = action.payload;
    },
    setCurrencyTableAmount: (state, action: PayloadAction<number>) => {
      state.currencyTableAmount = action.payload;
    },
    setCurrencies: (state, action: PayloadAction<Currency[]>) => {
      state.currencies = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCurrenciesData.pending, state => {
        state.status = Status.LOADING;
      })
      .addCase(fetchCurrenciesData.fulfilled, (state, action) => {
        state.status = Status.IDLE;
        state.currencies = action.payload?.[0]?.rates;
        localStorage.setItem("currencies", JSON.stringify(action.payload?.[0]?.rates));
        state.firstCurrency = action.payload?.[0]?.rates?.[0];
        state.secondCurrency = action.payload?.[0]?.rates?.[1];
        state.baseCurrency = action.payload?.[0]?.rates?.[0];
      })
      .addCase(fetchCurrenciesData.rejected, state => {
        state.status = Status.ERROR;
      });
  },
});

export const {
  setFirstCurrency,
  setSecondCurrency,
  setBaseCurrency,
  setCurrencyTableAmount,
  setCurrencies,
} = currenciesSlice.actions;

export default currenciesSlice.reducer;
