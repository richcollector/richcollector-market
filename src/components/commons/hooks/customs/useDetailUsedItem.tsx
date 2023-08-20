import { useQueryFetchUsedItem } from "../../../commons/hooks/queries/useQueryFetchUsedItem";
import { useMutationDeleteUsedItem } from "../../../commons/hooks/mutation/useMutationDeleteUsedItem";
import { useMutationToggleUsedItemPick } from "../../../commons/hooks/mutation/useMutationToggleUsedItemPick";
import { useMutationUsedItemBuying } from "../mutation/useMatationUsedItemBuying";
import { useRouter } from "next/router";
import { Modal } from "antd";

export function useDetailUsedItem() {
  const router = useRouter();
  const [deleteUsedItem] = useMutationDeleteUsedItem();
  const [usedItemPick] = useMutationToggleUsedItemPick();
  const [usedItemBuying] = useMutationUsedItemBuying();
  const { data, refetch } = useQueryFetchUsedItem({
    useditemId: String(router.query.board_id),
  });

  const onClickDelete = async () => {
    try {
      const result = await deleteUsedItem({
        variables: { useditemId: String(router.query.board_id) },
      });
      refetch();
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
      refetch();
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickBuying = async () => {
    if (confirm("구매하시겠습니까?")) {
      try {
        const result = await usedItemBuying({
          variables: { useritemId: String(router.query.board_id) },
        });
        Modal.success({
          content: "구매에 성공하였습니다.",
        });
        refetch();
        void router.push("/");
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
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
    onClickBuying,
  };
}
