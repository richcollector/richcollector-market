import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchUseditemsISoldArgs,
} from "../../../../commons/types/generated/types";

const FETCH_USED_ITEM_ISOLD = gql`
  query fetchUseditemsISold($search: String, $page: Int) {
    fetchUseditemsISold(search: $search, page: $page) {
      _id
      name
      soldAt
      price
      createdAt
    }
  }
`;

const FETCH_USED_ITEMS_COUNT_ISOLD = gql`
  query {
    fetchUseditemsCountISold
  }
`;

export function useQueryFetchItemCountIsold() {
  const query = useQuery<Pick<IQuery, "fetchUseditemsCountISold">>(
    FETCH_USED_ITEMS_COUNT_ISOLD,
  );
  return query;
}

export function useQueryFetchItemIsold() {
  const query = useQuery<
    Pick<IQuery, "fetchUseditemsISold">,
    IQueryFetchUseditemsISoldArgs
  >(FETCH_USED_ITEM_ISOLD);
  return query;
}
