import type { Dispatch, SetStateAction } from 'react';
import { useMutationDeleteItemQuestionAnswer } from '../mutation/useMutationDeleteItemQuestionAnswer';
import { useMutationUpdateItemQuestionAnswer } from '../mutation/useMutationUpdateItemQuestionAnswer';
import {
	useQueryFetchItemQuestionAnswer,
	FETCH_USED_ITEM_QUESTION_ANSWER,
} from '../queries/useQueryFetchItemQuestionAnswer';

interface IProps {
	useditemQuestionId: string | undefined;
	setUpdate: Dispatch<SetStateAction<string>>;
}

export function useReCommentList(props: IProps) {
	const [deleteAnswer] = useMutationDeleteItemQuestionAnswer();
	const [updateAnswer] = useMutationUpdateItemQuestionAnswer();
	const {
		data: answer,
		refetch,
		fetchMore,
	} = useQueryFetchItemQuestionAnswer({
		page: 1,
		useditemQuestionId: props.useditemQuestionId ?? '',
	});

	const onClickUpdate = (useditemQuestionAnswerId: string) => async (data: any) => {
		try {
			await updateAnswer({
				variables: {
					updateUseditemQuestionAnswerInput: {
						contents: data.contents,
					},
					useditemQuestionAnswerId,
				},
				refetchQueries: [
					{
						query: FETCH_USED_ITEM_QUESTION_ANSWER,
						variables: {
							page: 1,
							useditemQuestionId: props.useditemQuestionId,
						},
					},
				],
			});

			props.setUpdate('');
		} catch (error) {
			if (error instanceof Error) console.error('error::', error.message);
		}
	};

	const onClickDelete = (useditemQuestionAnswerId: string) => () => {
		deleteAnswer({
			variables: {
				useditemQuestionAnswerId,
			},
			refetchQueries: [
				{
					query: FETCH_USED_ITEM_QUESTION_ANSWER,
					variables: { page: 1, useditemQuestionId: props.useditemQuestionId },
				},
			],
		});
	};

	const onLoadMore = (): void => {
		if (answer === undefined) return;

		void fetchMore({
			variables: {
				page: Math.ceil(answer?.fetchUseditemQuestionAnswers.length / 10) + 1,
			},
			updateQuery: (prev, { fetchMoreResult }) => {
				if (fetchMoreResult?.fetchUseditemQuestionAnswers === undefined)
					return {
						fetchUseditemQuestionAnswers: [...prev.fetchUseditemQuestionAnswers],
					};

				return {
					fetchUseditemQuestionAnswers: [
						...prev.fetchUseditemQuestionAnswers,
						...fetchMoreResult.fetchUseditemQuestionAnswers,
					],
				};
			},
		});
	};
	return { answer, refetch, onClickUpdate, onClickDelete, onLoadMore };
}
