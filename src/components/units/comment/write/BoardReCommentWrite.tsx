import styled from "@emotion/styled";
import { type ApolloQueryResult, gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationCreateUseditemQuestionAnswerArgs,
  IQuery,
  IQueryFetchUseditemQuestionAnswersArgs,
} from "../../../../commons/types/generated/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./BoardCommentWrite.validation";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";
import type { SetStateAction } from "react";

export const Wrapper = styled.div`
  width: 1220px;
  height: 100%;
  margin-left: 100px;
  margin-bottom: 50px;
`;

export const PencilIcon = styled.img``;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
`;

export const ContentsWrapper = styled.div`
  border: 1px solid lightgray;
`;

export const Input = styled.input`
  height: 52px;

  font-size: 20px;
  padding-left: 20px;
  border: 1px solid lightgray;
  margin-right: 20px;
`;

export const Contents = styled.textarea`
  width: 100%;
  min-height: 108px;

  font-size: 20px;

  padding: 20px;
  border: none;
  border-bottom: 1px solid lightgray;
`;

export const BottomWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const ContentsLength = styled.div`
  width: 100%;
  height: 51px;
  line-height: 51px;
  padding-left: 20px;
  color: gray;
`;

export const Button = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;

  background-color: black;
  color: white;
  cursor: pointer;
`;

const CREATE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation createUseditemQuestionAnswer(
    $createUseditemQuestionAnswerInput: CreateUseditemQuestionAnswerInput!
    $useditemQuestionId: ID!
  ) {
    createUseditemQuestionAnswer(
      createUseditemQuestionAnswerInput: $createUseditemQuestionAnswerInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      user {
        _id
        email
        name
      }
      createdAt
    }
  }
`;
interface IProps {
  useditemQuestionId: string | undefined;
  setAnswerWrite: (value: SetStateAction<string>) => void;
  refetch: (
    variables?: Partial<IQueryFetchUseditemQuestionAnswersArgs> | undefined,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemQuestionAnswers">>>;
}

export default function BoardReCommentWrite(props: IProps): JSX.Element {
  const [info] = useRecoilState(userInfomation);
  const { handleSubmit, register, setValue, trigger, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [createAnswer] = useMutation<
    Pick<IMutation, "createUseditemQuestionAnswer">,
    IMutationCreateUseditemQuestionAnswerArgs
  >(CREATE_USED_ITEM_QUESTION_ANSWER);

  const onClickCreate = async (data: any) => {
    try {
      const result = await createAnswer({
        variables: {
          createUseditemQuestionAnswerInput: {
            contents: data.contents,
          },
          useditemQuestionId: props.useditemQuestionId ?? "",
        },
      });
      setValue("contents", "");
      props.setAnswerWrite("");
      props.refetch();
    } catch (error) {
      if (error instanceof Error) console.log("error::", error.message);
    }
  };

  return (
    <Wrapper>
      <>
        <PencilIcon />
        <span>답글달기</span>
      </>
      <InputWrapper>
        <Input disabled defaultValue={info} />
      </InputWrapper>
      <ContentsWrapper>
        <Contents
          maxLength={100}
          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
          {...register("contents")}
        />
        <BottomWrapper>
          <ContentsLength>/100</ContentsLength>
          <Button onClick={handleSubmit(onClickCreate)}>등록하기</Button>
          <Button
            onClick={() => {
              props.setAnswerWrite("");
            }}
          >
            취소
          </Button>
        </BottomWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
}
