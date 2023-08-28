import { gql, useQuery } from '@apollo/client';
import type {
	IQuery,
	IQueryFetchUseditemQuestionsArgs,
} from '../../../../commons/types/generated/types';

export const FETCH_USED_ITEM_QUESTIONS = gql`
	query fetchUseditemQuestions($page: Int, $useditemId: ID!) {
		fetchUseditemQuestions(page: $page, useditemId: $useditemId) {
			_id
			contents
			useditem {
				_id
			}
			user {
				_id
				email
				name
				picture
			}
			createdAt
		}
	}
`;

export function useQueryFetchItemQuestions(variables: IQueryFetchUseditemQuestionsArgs) {
	const query = useQuery<Pick<IQuery, 'fetchUseditemQuestions'>, IQueryFetchUseditemQuestionsArgs>(
		FETCH_USED_ITEM_QUESTIONS,
		{ variables },
	);

	return query;
}
