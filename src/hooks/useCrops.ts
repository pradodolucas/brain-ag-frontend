import { useState, useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchCrops } from "@/store/slices/cropSlice";

export function useCrops() {
  const dispatch = useAppDispatch();
  const { data, loading, error, lastFetch } = useAppSelector(
    (state) => state.crops
  );
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    setIsFetching(true);
    dispatch(fetchCrops({ force: true })).finally(() => {
      setIsFetching(false);
    });

    const interval = setInterval(() => {
      dispatch(fetchCrops({ force: true }));
    }, 5 * 60 * 1000);

    return () => clearInterval(interval);
  }, [dispatch]);

  const forceReload = useCallback(() => {
    setIsFetching(true);
    dispatch(fetchCrops({ force: true })).finally(() => {
      setIsFetching(false);
    });
  }, [dispatch]);

  return {
    crops: data,
    loading: loading || isFetching,
    error,
    lastFetch,
    forceReload,
  };
}
