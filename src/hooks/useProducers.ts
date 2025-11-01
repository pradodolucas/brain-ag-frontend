import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/store";
import { fetchProducers } from "@/store/slices/producersSlice";

export function useProducers(force = false) {
  const dispatch = useAppDispatch();
  const { data, loading, fetching, error } = useAppSelector((s) => s.producers);


  const refetch = useCallback(
    (force = false) => {
      dispatch(fetchProducers(force));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchProducers(force));
  }, [dispatch, force]);

  return { data, loading, error, fetching, refetch };
}
