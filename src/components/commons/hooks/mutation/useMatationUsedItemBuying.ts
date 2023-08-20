import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationCreatePointTransactionOfBuyingAndSellingArgs,
} from "../../../../commons/types/generated/types";

const USED_ITEM_BUYING = gql`
  mutation createPointTransactionOfBuyingAndSelling($useritemId: ID!) {
    createPointTransactionOfBuyingAndSelling(useritemId: $useritemId) {
      _id
      name
    }
  }
`;

export function useMutationUsedItemBuying() {
  const mutation = useMutation<
    Pick<IMutation, "createPointTransactionOfBuyingAndSelling">,
    IMutationCreatePointTransactionOfBuyingAndSellingArgs
  >(USED_ITEM_BUYING);
  return mutation;
}
