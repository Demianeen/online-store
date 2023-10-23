import React, { useEffect } from "react";
import AppRouter from "./components/AppRouter/AppRouter";
import withLayout from "./layout/Layout";
import Notification from "./components/Notification/Notification";
import AlertHandler from "./components/AlertHandler/AlertHandler";
import { useFetchCurrencyRatesQuery } from "./http/currencyApi/currencyApi";
import { useAppDispatch } from "./hooks/redux";
import { setCurrencyRates } from "./store/reducers/currencySlice/currencySliceActions";

const App = () => {
  const dispatch = useAppDispatch();

  const { data: currencyData, isSuccess } =
    useFetchCurrencyRatesQuery(undefined);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setCurrencyRates(currencyData));
    }
  }, [currencyData]);

  return (
    <>
      <AppRouter></AppRouter>
      <Notification />
      <AlertHandler />
    </>
  );
};

export default withLayout(App);
