import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationCreateUseditemArgs,
} from "../../../../commons/types/generated/types";

const CREATE_USED_ITEM = gql`
  mutation createUsedItem($createUseditemInput: CreateUseditemInput!) {
    createUsedItem(createUseditemInput: $createUseditemInput) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      useditemAddress
    }
  }
`;

export function useMutationCreateUsedItem() {
  const mutation = useMutation<
    Pick<IMutation, "createUseditem">,
    IMutationCreateUseditemArgs
  >(CREATE_USED_ITEM);
  return mutation;
}
