import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import styled from "@emotion/styled";
import * as S from "./Comment.styles";
import { v4 as uuidv4 } from "uuid";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./CommentList.validation";
import InfiniteScroll from "react-infinite-scroller";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";
import ReCommentWrite from "../write/ReCommentWrite";
import { useReCommentList } from "../../../commons/hooks/customs/useRecommentList";
import { getDate } from "../../../../commons/libraries/utils";

const ItemWrapper = styled.div`
  width: 1220px;
  margin-left: 100px;
  padding-top: 20px;
  height: 100%;
`;

interface IProps {
  useditemQuestionId: string | undefined;
  answerWrite: string | undefined;
  setAnswerWrite: Dispatch<SetStateAction<string>>;
  writerId: string | undefined;
}

export default function ReCommentList({
  useditemQuestionId,
  answerWrite,
  setAnswerWrite,
  writerId,
}: IProps) {
  const [info] = useRecoilState(userInfomation);
  const [update, setUpdate] = useState("");
  const { handleSubmit, register, setValue, trigger, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const { answer, onClickDelete, onLoadMore, refetch, onClickUpdate } =
    useReCommentList({ useditemQuestionId, setUpdate });

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
            <S.FlexWrapper>
              {answer?.fetchUseditemQuestionAnswers.map((el, index) => (
                <>
                  <S.QuestionAnswerBox key={uuidv4()}>
                    <S.Arrow src="/icon/arrow_right.svg" />
                    <S.Avatar src="/icon/user.svg" />
                    <S.MainWrapper>
                      <S.WriterWrapper>
                        <S.Writer>{el.user.name}</S.Writer>
                      </S.WriterWrapper>
                      {update === el._id ? (
                        <>
                          <S.ContentsWrapper>
                            <S.ContentsInput
                              maxLength={100}
                              placeholder="개인정보를 공유 및 요청하거나, 명예 훼손, 무단 광고, 불법 정보 유포시 모니터링 후 삭제될 수 있으며, 이에 대한 민형사상 책임은 게시자에게 있습니다."
                              {...register("contents")}
                            />
                            <S.BottomWrapper>
                              <S.ContentsLength>/100</S.ContentsLength>
                              <S.Button
                                onClick={handleSubmit(onClickUpdate(el._id))}
                              >
                                수정하기
                              </S.Button>
                              <S.Button
                                onClick={() => {
                                  setUpdate("");
                                }}
                              >
                                취소
                              </S.Button>
                            </S.BottomWrapper>
                          </S.ContentsWrapper>
                          <S.ErrorBox>
                            {formState.errors.contents?.message}
                          </S.ErrorBox>
                        </>
                      ) : (
                        <S.Contents>{el.contents}</S.Contents>
                      )}
                      <S.DateString>{getDate(el.createdAt)}</S.DateString>
                    </S.MainWrapper>
                    {update === el._id ? (
                      ""
                    ) : info[0]?.email === el.user.email ? (
                      <S.OptionWrapper>
                        <S.Icon
                          onClick={() => {
                            setUpdate(el._id);
                          }}
                          src="/icon/update.svg"
                        />
                        <S.Icon
                          onClick={onClickDelete(el._id)}
                          src="/icon/close.svg"
                        />
                      </S.OptionWrapper>
                    ) : (
                      ""
                    )}
                  </S.QuestionAnswerBox>
                </>
              ))}
            </S.FlexWrapper>
          </ItemWrapper>
        </InfiniteScroll>
      )}
      {answerWrite === useditemQuestionId && (
        <ReCommentWrite
          useditemQuestionId={useditemQuestionId}
          setAnswerWrite={setAnswerWrite}
          refetch={refetch}
        />
      )}
    </>
  );
}
