import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./BoardCommentList.validation";
import styled from "@emotion/styled";
import BoardCommentWriteUI from "../write/BoardCommentWrite";
import { gql, useMutation, useQuery } from "@apollo/client";
import type {
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
  IMutation,
  IMutationDeleteUseditemQuestionArgs,
  IMutationUpdateUseditemQuestionArgs,
} from "../../../../commons/types/generated/types";
import { v4 as uuidv4 } from "uuid";
import InfiniteScroll from "react-infinite-scroller";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";
import BoardReCommentList from "./BoardReCommentList";

const ItemWrapper = styled.div`
  width: 1320px;
  padding-top: 20px;
  height: 100%;
  border-bottom: 1px solid lightgray;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const QuestionAnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 2px solid #ededed;
  padding-bottom: 20px;
  width: 100%;

  margin-bottom: 30px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
`;

const MainWrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;

const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Writer = styled.div`
  font-size: 30px;
  font-weight: bold;

  margin-bottom: 10px;
`;
const Contents = styled.div`
  font-size: 20px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const Icon = styled.img`
  width: 24px;
  height: 24px;

  margin-left: 10px;
  cursor: pointer;
`;

const DateString = styled.div`
  color: lightgray;
  padding-top: 15px;
`;

export const ContentsWrapper = styled.div`
  border: 1px solid lightgray;
`;

export const ContentsInput = styled.textarea`
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

const FETCH_USED_ITEM_QUESTIONS = gql`
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
      }
      createdAt
    }
  }
`;

const DELETE_USED_ITEM_QUESTION = gql`
  mutation deleteUseditemQuestion($useditemQuestionId: ID!) {
    deleteUseditemQuestion(useditemQuestionId: $useditemQuestionId)
  }
`;

const UPDATE_USED_ITEM_QUESTION = gql`
  mutation updateUseditemQuestion(
    $updateUseditemQuestionInput: UpdateUseditemQuestionInput!
    $useditemQuestionId: ID!
  ) {
    updateUseditemQuestion(
      updateUseditemQuestionInput: $updateUseditemQuestionInput
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
    }
  }
`;

interface IProps {
  useditemId: string | undefined;
  writerId: string | undefined;
}

export default function BoardCommentListUIItem(props: IProps) {
  const [info] = useRecoilState(userInfomation);
  const [update, setUpdate] = useState("");
  const [answerWrite, setAnswerWrite] = useState("");
  const { handleSubmit, register, setValue, trigger, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    data: questions,
    refetch,
    fetchMore,
  } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      page: 1,
      useditemId: props.useditemId ?? "",
    },
  });

  const [deleteQuestion] = useMutation<
    Pick<IMutation, "deleteUseditemQuestion">,
    IMutationDeleteUseditemQuestionArgs
  >(DELETE_USED_ITEM_QUESTION);

  const [updateQuestion] = useMutation<
    Pick<IMutation, "updateUseditemQuestion">,
    IMutationUpdateUseditemQuestionArgs
  >(UPDATE_USED_ITEM_QUESTION);

  const onClickUpdate = (useditemQuestionId: string) => async () => {
    try {
      const result = await updateQuestion({
        variables: {
          updateUseditemQuestionInput: {
            contents: "",
          },
          useditemQuestionId,
        },
        refetchQueries: [
          {
            query: FETCH_USED_ITEM_QUESTIONS,
            variables: { page: 1, useditemId: props.useditemId ?? "" },
          },
        ],
      });

      setUpdate("");
    } catch (error) {
      if (error instanceof Error) console.log("error::", error.message);
    }
  };

  const onClickDelete = (useditemQuestionId: string) => () => {
    deleteQuestion({
      variables: {
        useditemQuestionId,
      },
      refetchQueries: [
        {
          query: FETCH_USED_ITEM_QUESTIONS,
          variables: { page: 1, useditemId: props.useditemId ?? "" },
        },
      ],
    });
  };

  const onLoadMore = (): void => {
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

  useEffect(() => {
    if (update === "") {
      setValue("contents", "");
    } else if (update) {
      const choose = questions?.fetchUseditemQuestions.filter(
        (el) => el._id === update,
      );
      setValue("contents", String(choose?.[0].contents));
      trigger("contents");
    }
  }, [update]);

  console.log("Questions::", questions);

  return (
    <>
      <BoardCommentWriteUI useditemId={props.useditemId} refetch={refetch} />
      <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
        <ItemWrapper>
          <FlexWrapper>
            {questions?.fetchUseditemQuestions.map((el) => (
              <>
                <QuestionAnswerBox key={uuidv4()}>
                  <Avatar src="/icon/user.svg" />
                  <MainWrapper>
                    <WriterWrapper>
                      <Writer>{el.user.name}</Writer>
                    </WriterWrapper>
                    {update === el._id ? (
                      <ContentsWrapper>
                        <ContentsInput
                          maxLength={100}
                          placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                          {...register("contents")}
                        />
                        <BottomWrapper>
                          <ContentsLength>/100</ContentsLength>
                          <Button onClick={onClickUpdate(el._id)}>
                            수정하기
                          </Button>
                          <Button
                            onClick={() => {
                              setUpdate("");
                            }}
                          >
                            취소
                          </Button>
                        </BottomWrapper>
                      </ContentsWrapper>
                    ) : (
                      <Contents>{el.contents}</Contents>
                    )}
                    <DateString>{el.createdAt}</DateString>
                  </MainWrapper>
                  {update === el._id ? (
                    ""
                  ) : info === el.user.email ? (
                    <OptionWrapper>
                      <Icon
                        onClick={() => {
                          setUpdate(el._id);
                        }}
                        src="/icon/update.svg"
                      />
                      <Icon
                        onClick={onClickDelete(el._id)}
                        src="/icon/close.svg"
                      />
                    </OptionWrapper>
                  ) : info === props.writerId ? (
                    <Icon
                      src="/icon/question.svg"
                      onClick={() => {
                        setAnswerWrite(el._id);
                      }}
                    />
                  ) : (
                    ""
                  )}
                </QuestionAnswerBox>
                <BoardReCommentList
                  useditemQuestionId={el._id}
                  answerWrite={answerWrite}
                  setAnswerWrite={setAnswerWrite}
                  writerId={props.writerId}
                />
              </>
            ))}
          </FlexWrapper>
        </ItemWrapper>
      </InfiniteScroll>
    </>
  );
}
