import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import { gql, useMutation, useQuery } from "@apollo/client";
import type {
  IQueryFetchUseditemQuestionAnswersArgs,
  IQuery,
  IMutation,
  IMutationUpdateUseditemQuestionAnswerArgs,
  IMutationDeleteUseditemQuestionAnswerArgs,
} from "../../../../commons/types/generated/types";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./BoardCommentList.validation";
import InfiniteScroll from "react-infinite-scroller";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";
import BoardReCommentWrite from "../write/BoardReCommentWrite";

const ItemWrapper = styled.div`
  width: 1220px;
  margin-left: 100px;
  padding-top: 20px;
  height: 100%;
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

  padding-bottom: 20px;
  width: 100%;

  margin-bottom: 30px;
`;

const Arrow = styled.img`
  width: 24px;
  height: 24px;

  margin-right: 10px;
`;

const Avatar = styled.img`
  width: 48px;
  height: 48px;
  margin-right: 10px;
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

const FETCH_USED_ITEM_QUESTION_ANSWER = gql`
  query fetchUseditemQuestionAnswers($page: Int, $useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(
      page: $page
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      user {
        _id
        email
        name
      }
    }
  }
`;

const DELETE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation deleteUseditemQuestionAnswer($useditemQuestionAnswerId: ID!) {
    deleteUseditemQuestionAnswer(
      useditemQuestionAnswerId: $useditemQuestionAnswerId
    )
  }
`;

const UPDATE_USED_ITEM_QUESTION_ANSWER = gql`
  mutation updateUseditemQuestionAnswer(
    $updateUseditemQuestionAnswerInput: UpdateUseditemQuestionAnswerInput!
    $useditemQuestionAnswerId: ID!
  ) {
    updateUseditemQuestionAnswer(
      updateUseditemQuestionAnswerInput: $updateUseditemQuestionAnswerInput
      useditemQuestionAnswerId: $useditemQuestionAnswerId
    ) {
      _id
    }
  }
`;

interface IProps {
  useditemQuestionId: string | undefined;
  answerWrite: string | undefined;
  setAnswerWrite: Dispatch<SetStateAction<string>>;
  writerId: string | undefined;
}

export default function BoardReCommentList(props: IProps) {
  const [info] = useRecoilState(userInfomation);
  const [update, setUpdate] = useState("");
  const { handleSubmit, register, setValue, trigger, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const {
    data: answer,
    refetch,
    fetchMore,
  } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWER, {
    variables: {
      page: 1,
      useditemQuestionId: props.useditemQuestionId ?? "",
    },
  });

  const [updateAnswer] = useMutation<
    Pick<IMutation, "updateUseditemQuestionAnswer">,
    IMutationUpdateUseditemQuestionAnswerArgs
  >(UPDATE_USED_ITEM_QUESTION_ANSWER);

  const onClickUpdate =
    (useditemQuestionAnswerId: string) => async (data: any) => {
      try {
        const result = await updateAnswer({
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

        setUpdate("");
      } catch (error) {
        if (error instanceof Error) console.log("error::", error.message);
      }
    };

  const [deleteAnswer] = useMutation<
    Pick<IMutation, "deleteUseditemQuestionAnswer">,
    IMutationDeleteUseditemQuestionAnswerArgs
  >(DELETE_USED_ITEM_QUESTION_ANSWER);

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
            fetchUseditemQuestionAnswers: [
              ...prev.fetchUseditemQuestionAnswers,
            ],
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
  console.log("useditemQuestionId::", props.useditemQuestionId);
  console.log("answerWrite::", props.answerWrite);
  console.log("answer::", answer);
  useEffect(() => {
    if (update === "") {
      setValue("contents", "");
    } else if (update) {
      const choose = answer?.fetchUseditemQuestionAnswers.filter(
        (el) => el._id === update,
      );
      setValue("contents", String(choose?.[0].contents));
      trigger("contents");
    }
  }, [update]);

  return (
    <>
      {answer?.fetchUseditemQuestionAnswers[0] !== undefined && (
        <InfiniteScroll pageStart={0} loadMore={onLoadMore} hasMore={true}>
          <ItemWrapper>
            <FlexWrapper>
              {answer?.fetchUseditemQuestionAnswers.map((el, index) => (
                <>
                  <QuestionAnswerBox key={uuidv4()}>
                    <Arrow src="/icon/arrow_right.svg" />
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
                            <Button
                              onClick={handleSubmit(onClickUpdate(el._id))}
                            >
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
                      <OptionWrapper>
                        <Icon
                          src="/icon/question.svg"
                          onClick={() => {
                            props.setAnswerWrite(el._id);
                          }}
                        />
                      </OptionWrapper>
                    ) : (
                      ""
                    )}
                  </QuestionAnswerBox>
                </>
              ))}
            </FlexWrapper>
          </ItemWrapper>
        </InfiniteScroll>
      )}
      {props.answerWrite === props.useditemQuestionId && (
        <BoardReCommentWrite
          useditemQuestionId={props.useditemQuestionId}
          setAnswerWrite={props.setAnswerWrite}
          refetch={refetch}
        />
      )}
    </>
  );
}
