import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import currenciesReducer from "../features/currencies/currenciesSlice";

export const store = configureStore({
  reducer: {
    currencies: currenciesReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
