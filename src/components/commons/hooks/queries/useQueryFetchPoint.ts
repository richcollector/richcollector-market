import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchPointTransactionsArgs,
  IQueryFetchPointTransactionsOfBuyingArgs,
  IQueryFetchPointTransactionsOfLoadingArgs,
  IQueryFetchPointTransactionsOfSellingArgs,
} from "../../../../commons/types/generated/types";

const FETCH_POINT_TRANSACTIONS = gql`
  query fetchPointTransactions($search: String, $page: Int) {
    fetchPointTransactions(search: $search, page: $page) {
      _id
      impUid
      amount
      status
      statusDetail
      useditem {
        name
        price
      }
      createdAt
    }
  }
`;

const FETCH_POINT_TRANSACTIONS_OF_LOADING = gql`
  query fetchPointTransactionsOfLoading($search: String, $page: Int) {
    fetchPointTransactionsOfLoading(search: $search, page: $page) {
      _id
      impUid
      amount
      status
      statusDetail
      useditem {
        name
        price
      }
      createdAt
    }
  }
`;

const FETCH_POINT_TRANSACTIONS_OF_BUYING = gql`
  query fetchPointTransactionsOfBuying($search: String, $page: Int) {
    fetchPointTransactionsOfBuying(search: $search, page: $page) {
      _id
      impUid
      amount
      status
      statusDetail
      useditem {
        name
        price
      }
      createdAt
    }
  }
`;

const FETCH_POINT_TRANSACTIONS_OF_SELLING = gql`
  query fetchPointTransactionsOfSelling($search: String, $page: Int) {
    fetchPointTransactionsOfSelling(search: $search, page: $page) {
      _id
      impUid
      amount
      status
      statusDetail
      useditem {
        name
        price
      }
      createdAt
    }
  }
`;

const FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING = gql`
  query {
    fetchPointTransactionsCountOfBuying
  }
`;

const FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING = gql`
  query {
    fetchPointTransactionsCountOfSelling
  }
`;

const FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING = gql`
  query {
    fetchPointTransactionsCountOfLoading
  }
`;

export function useQueryFetchPointTransactions() {
  const query = useQuery<
    Pick<IQuery, "fetchPointTransactions">,
    IQueryFetchPointTransactionsArgs
  >(FETCH_POINT_TRANSACTIONS);
  return query;
}

export function useQueryFetchPointTransactionsOfLoading() {
  const query = useQuery<
    Pick<IQuery, "fetchPointTransactionsOfLoading">,
    IQueryFetchPointTransactionsOfLoadingArgs
  >(FETCH_POINT_TRANSACTIONS_OF_LOADING);
  return query;
}

export function useQueryFetchPointTransactionsOfBuying(
  variables: IQueryFetchPointTransactionsOfBuyingArgs,
) {
  const query = useQuery<
    Pick<IQuery, "fetchPointTransactionsOfBuying">,
    IQueryFetchPointTransactionsOfBuyingArgs
  >(FETCH_POINT_TRANSACTIONS_OF_BUYING, { variables });
  return query;
}

export function useQueryFetchPointTransactionsOfBuyingCount() {
  const query = useQuery<Pick<IQuery, "fetchPointTransactionsCountOfBuying">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_BUYING,
  );
  return query;
}

export function useQueryFetchPointTransactionsOfSelling(
  variables: IQueryFetchPointTransactionsOfSellingArgs,
) {
  const query = useQuery<
    Pick<IQuery, "fetchPointTransactionsOfSelling">,
    IQueryFetchPointTransactionsOfSellingArgs
  >(FETCH_POINT_TRANSACTIONS_OF_SELLING, { variables });
  return query;
}

export function useQueryFetchPointTransactionsOfSellingCount() {
  const query = useQuery<Pick<IQuery, "fetchPointTransactionsCountOfSelling">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_SELLING,
  );
  return query;
}

export function useQueryFetchPointTransactionsOfLoadingCount() {
  const query = useQuery<Pick<IQuery, "fetchPointTransactionsCountOfLoading">>(
    FETCH_POINT_TRANSACTIONS_COUNT_OF_LOADING,
  );
  return query;
}
