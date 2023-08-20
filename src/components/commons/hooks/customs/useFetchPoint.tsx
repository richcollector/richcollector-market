import { type ChangeEvent } from "react";
import {
  useQueryFetchPointTransactions,
  useQueryFetchPointTransactionsOfBuying,
  useQueryFetchPointTransactionsOfLoading,
  useQueryFetchPointTransactionsOfSelling,
  useQueryFetchPointTransactionsOfBuyingCount,
  useQueryFetchPointTransactionsOfSellingCount,
  useQueryFetchPointTransactionsOfLoadingCount,
} from "../queries/useQueryFetchPoint";
import _ from "lodash";

interface IProps {
  menu: string;
}

export function useFetchPoint({ menu }: IProps) {
  const { data, refetch: pointRefetch } = useQueryFetchPointTransactions();

  const { data: loadingData, refetch: loadingRefetch } =
    useQueryFetchPointTransactionsOfLoading();

  const { data: buyingData, refetch: buyingRefetch } =
    useQueryFetchPointTransactionsOfBuying({
      search: "",
      page: 1,
    });

  const { data: buyingCount } = useQueryFetchPointTransactionsOfBuyingCount();

  const { data: sellingData, refetch: sellingRefetch } =
    useQueryFetchPointTransactionsOfSelling({
      search: "",
      page: 1,
    });

  const { data: sellingCount } = useQueryFetchPointTransactionsOfSellingCount();

  const { data: loadingCount } = useQueryFetchPointTransactionsOfLoadingCount();

  const getDebounce = _.debounce((value) => {
    switch (menu) {
      case "1":
        void pointRefetch({ search: value, page: 1 });
        return;

      case "2":
        void loadingRefetch({ search: value, page: 1 });
        return;

      case "3":
        void buyingRefetch({ search: value, page: 1 });
        return;

      case "4":
        void sellingRefetch({ search: value, page: 1 });
    }
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value);
  };

  return {
    data,
    loadingData,
    buyingData,
    sellingData,
    buyingRefetch,
    sellingRefetch,
    pointRefetch,
    loadingRefetch,
    onChangeSearch,
    buyingCount,
    sellingCount,
    loadingCount,
  };
}
