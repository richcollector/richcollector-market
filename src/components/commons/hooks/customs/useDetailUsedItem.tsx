import {
	useQueryFetchUsedItem,
	FETCH_USED_ITEM,
} from '../../../commons/hooks/queries/useQueryFetchUsedItem';
import { useMutationDeleteUsedItem } from '../../../commons/hooks/mutation/useMutationDeleteUsedItem';
import { useMutationToggleUsedItemPick } from '../../../commons/hooks/mutation/useMutationToggleUsedItemPick';
import { useMutationUsedItemBuying } from '../mutation/useMatationUsedItemBuying';
import { useRouter } from 'next/router';
import { Modal } from 'antd';

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
			await deleteUsedItem({
				variables: { useditemId: String(router.query.board_id) },
			});
			refetch();
			void router.push('/');
		} catch (error) {
			if (error instanceof Error) Modal.error({ content: error.message });
		}
	};

	const onClickPick = async () => {
		try {
			await usedItemPick({
				variables: { useditemId: String(router.query.board_id) },
				update: (cache, { data }) => {
					cache.writeQuery({
						query: FETCH_USED_ITEM,
						variables: { boardId: String(router.query.board_id) },
						data: {
							fetchUseditem: {
								_id: String(router.query.board_id),
								__typename: 'Useditem',
								pickedCount: data?.toggleUseditemPick,
							},
						},
					});
				},
			});
		} catch (error) {
			if (error instanceof Error) Modal.error({ content: error.message });
		}
	};

	const onClickBuying = async () => {
		if (confirm('구매하시겠습니까?')) {
			try {
				await usedItemBuying({
					variables: { useritemId: String(router.query.board_id) },
				});
				Modal.success({
					content: '구매에 성공하였습니다.',
				});
				refetch();
				void router.push('/');
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
