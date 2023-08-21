import { gql, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchUseditemsIPickedArgs,
} from "../../../../commons/types/generated/types";

const FETCH_USED_ITEMS_IPICKED = gql`
  query fetchUseditemsIPicked($search: String, $page: Int) {
    fetchUseditemsIPicked(search: $search, page: $page) {
      _id
      name
      soldAt
      price
      createdAt
    }
  }
`;

const FETCH_USED_ITEMS_COUNT_IPICKED = gql`
  query {
    fetchUseditemsCountIPicked
  }
`;
export function useQueryFetchItemPick() {
  const query = useQuery<
    Pick<IQuery, "fetchUseditemsIPicked">,
    IQueryFetchUseditemsIPickedArgs
  >(FETCH_USED_ITEMS_IPICKED);
  return query;
}

export function useQueryFetchItemCountPick() {
  const query = useQuery<Pick<IQuery, "fetchUseditemsCountIPicked">>(
    FETCH_USED_ITEMS_COUNT_IPICKED,
  );
  return query;
}
