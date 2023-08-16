import { gql, useQuery } from "@apollo/client";
import {
  type IQuery,
  type IQueryFetchUseditemArgs,
} from "../../../../commons/types/generated/types";

const FETCH_USED_ITEM = gql`
  query fetchUseditem($useditemId: ID!) {
    fetchUseditem(useditemId: $useditemId) {
      _id
      createdAt
      name
      remarks
      contents
      tags
      pickedCount
      images
      seller {
        name
        picture
      }
      useditemAddress {
        lat
        lng
        address
        addressDetail
      }
    }
  }
`;

export function useMutationFetchUsedItem(variables: IQueryFetchUseditemArgs) {
  const query = useQuery<
    Pick<IQuery, "fetchUseditem">,
    IQueryFetchUseditemArgs
  >(FETCH_USED_ITEM, { variables });
  return query;
}
