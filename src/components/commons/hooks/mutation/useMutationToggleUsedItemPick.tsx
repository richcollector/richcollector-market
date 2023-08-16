import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationToggleUseditemPickArgs,
} from "../../../../commons/types/generated/types";

const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

export function useMutationToggleUsedItemPick() {
  const mutation = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK);
  return mutation;
}
