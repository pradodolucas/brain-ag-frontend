import { configureStore } from "@reduxjs/toolkit";
import producersReducer from "./slices/producersSlice";
import cropReducer from "./slices/cropSlice";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

export const store = () => {
  return configureStore({
    reducer: {
      producers: producersReducer,
      crops: cropReducer,
    },
  });
};

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
