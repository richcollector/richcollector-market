import {
	FETCH_USED_ITEM_QUESTIONS,
	useQueryFetchItemQuestions,
} from '../queries/useQueryFetchItemQuestions';
import { useMutationDeleteItemQuestion } from '../mutation/useMutationDeleteItemQuestion';
import { useMutationUpdateItemQuestion } from '../mutation/useMutaionUpdateItemQuestion';
import type { Dispatch, SetStateAction } from 'react';

interface IProps {
	useditemId: string | undefined;
	setUpdate: Dispatch<SetStateAction<string>>;
}

export function useCommentList(props: IProps) {
	const [deleteQuestion] = useMutationDeleteItemQuestion();
	const [updateQuestion] = useMutationUpdateItemQuestion();

	const {
		data: questions,
		refetch,
		fetchMore,
	} = useQueryFetchItemQuestions({
		page: 1,
		useditemId: props.useditemId ?? '',
	});

	const onClickDelete = (useditemQuestionId: string) => () => {
		deleteQuestion({
			variables: {
				useditemQuestionId,
			},
			refetchQueries: [
				{
					query: FETCH_USED_ITEM_QUESTIONS,
					variables: { page: 1, useditemId: props.useditemId ?? '' },
				},
			],
		});
	};

	const onClickUpdate = (useditemQuestionId: string) => async (data: any) => {
		try {
			await updateQuestion({
				variables: {
					updateUseditemQuestionInput: {
						contents: data.contents,
					},
					useditemQuestionId,
				},
				refetchQueries: [
					{
						query: FETCH_USED_ITEM_QUESTIONS,
						variables: { page: 1, useditemId: props.useditemId ?? '' },
					},
				],
			});

			props.setUpdate('');
		} catch (error) {
			if (error instanceof Error) console.error('error::', error.message);
		}
	};

	const onLoadMore = () => {
		if (questions === undefined) return;

		void fetchMore({
			variables: {
				page: Math.ceil(questions?.fetchUseditemQuestions.length / 10) + 1,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (fetchMoreResult?.fetchUseditemQuestions === undefined)
					return { fetchUseditemQuestions: [...prev.fetchUseditemQuestions] };

				return {
					fetchUseditemQuestions: [
						...prev.fetchUseditemQuestions,
						...fetchMoreResult.fetchUseditemQuestions,
					],
				};
			},
		});
	};

	return {
		questions,
		onClickDelete,
		onClickUpdate,
		refetch,
		onLoadMore,
	};
}
