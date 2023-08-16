import { gql, useMutation } from "@apollo/client";
import {
  type IMutation,
  type IMutationUpdateUseditemArgs,
} from "../../../../commons/types/generated/types";

const UPDATE_USED_ITEM = gql`
  mutation updateUseditem(
    $updateUseditemInput: UpdateUseditemInput!
    $useditemId: ID!
  ) {
    updateUseditem(
      updateUseditemInput: $updateUseditemInput
      useditemId: $useditemId
    ) {
      _id
      name
    }
  }
`;

export function useMutationUpdateUsedItem() {
  const mutation = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);
  return mutation;
}
