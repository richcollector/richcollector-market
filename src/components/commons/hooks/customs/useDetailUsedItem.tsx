import { useMutationFetchUsedItem } from "../../../commons/hooks/queries/useQueryFetchUsedItem";
import { useMutationDeleteUsedItem } from "../../../commons/hooks/mutation/useMutationDeleteUsedItem";
import { useMutationToggleUsedItemPick } from "../../../commons/hooks/mutation/useMutationToggleUsedItemPick";
import { useRouter } from "next/router";
import { Modal } from "antd";

export function useDetailUsedItem() {
  const router = useRouter();
  const [deleteUsedItem] = useMutationDeleteUsedItem();
  const [usedItemPick] = useMutationToggleUsedItemPick();
  const { data } = useMutationFetchUsedItem({
    useditemId: String(router.query.board_id),
  });

  const onClickDelete = async () => {
    try {
      const result = await deleteUsedItem({
        variables: { useditemId: String(router.query.board_id) },
      });
      console.log(result);
      void router.push("/");
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickPick = async () => {
    try {
      const result = await usedItemPick({
        variables: { useditemId: String(router.query.board_id) },
      });
      console.log("result::", result);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = (useditemId: string) => () => {
    void router.push(`/market/${useditemId}/edit`);
  };

  return {
    data,
    onClickDelete,
    onClickUpdate,
    onClickPick,
  };
}
