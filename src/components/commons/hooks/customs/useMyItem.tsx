import {
  useQueryFetchItemIsold,
  useQueryFetchItemCountIsold,
} from "../queries/useQueryFetchItemIsold";
import {
  useQueryFetchItemPick,
  useQueryFetchItemCountPick,
} from "../queries/useQueryFetchItemPick";

export function useMuItem() {
  const { data, refetch } = useQueryFetchItemIsold();
  const { data: soldCount } = useQueryFetchItemCountIsold();
  const { data: pickData, refetch: pickRefetch } = useQueryFetchItemPick();
  const { data: pickCount } = useQueryFetchItemCountPick();
  return { data, refetch, pickRefetch, soldCount, pickCount, pickData };
}
