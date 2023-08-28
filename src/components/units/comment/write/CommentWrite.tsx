import styled from '@emotion/styled';
import * as S from './CommentWrite.styles';
import { type ApolloQueryResult, gql, useMutation } from '@apollo/client';
import type {
	IMutation,
	IMutationCreateUseditemQuestionArgs,
	IQuery,
	IQueryFetchUseditemQuestionsArgs,
} from '../../../../commons/types/generated/types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './CommentWrite.validation';
import { useRecoilState } from 'recoil';
import { userInfomation } from '../../../../commons/store';
import { Phone, Monitor } from '../../../../commons/styles/globalStyles';

export const Wrapper = styled.div`
	width: 1320px;
	height: 100%;
	margin-bottom: 50px;
	@media screen and (max-width: ${Phone - 1}px) {
		width: 400px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 767px;
	}
`;

const CREATE_USED_ITEM_QUESTION = gql`
	mutation createUseditemQuestion(
		$createUseditemQuestionInput: CreateUseditemQuestionInput!
		$useditemId: ID!
	) {
		createUseditemQuestion(
			createUseditemQuestionInput: $createUseditemQuestionInput
			useditemId: $useditemId
		) {
			_id
			contents
			useditem {
				_id
			}
			user {
				_id
			}
		}
	}
`;
interface IProps {
	useditemId: string | undefined;
	refetch: (
		variables?: Partial<IQueryFetchUseditemQuestionsArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchUseditemQuestions'>>>;
}

export default function CommentWrite(props: IProps): JSX.Element {
	const [info] = useRecoilState(userInfomation);
	const { handleSubmit, register, setValue, trigger, formState } = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const [createQuestion] = useMutation<
		Pick<IMutation, 'createUseditemQuestion'>,
		IMutationCreateUseditemQuestionArgs
	>(CREATE_USED_ITEM_QUESTION);

	const onClickCreate = async (data: any) => {
		try {
			const result = await createQuestion({
				variables: {
					createUseditemQuestionInput: {
						contents: data.contents,
					},
					useditemId: props.useditemId ?? '',
				},
			});
			setValue('contents', '');
			props.refetch();
		} catch (error) {
			if (error instanceof Error) console.log('error::', error.message);
		}
	};

	return (
		<Wrapper>
			<>
				<S.PencilIcon />
				<span>문의하기</span>
			</>
			<S.InputWrapper>
				<S.Input disabled defaultValue={info[0]?.name} />
			</S.InputWrapper>
			<S.ContentsWrapper>
				<S.Contents
					maxLength={100}
					placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
					{...register('contents')}
				/>
				<S.BottomWrapper>
					<S.ContentsLength>/100</S.ContentsLength>
					<S.Button onClick={handleSubmit(onClickCreate)}>등록하기</S.Button>
				</S.BottomWrapper>
			</S.ContentsWrapper>
			<S.ErrorBox>{formState.errors.contents?.message}</S.ErrorBox>
		</Wrapper>
	);
}
