import { useState } from "react";
import styled from "@emotion/styled";
import { Rate, Modal } from "antd";
import BoardCommentWriteUI from "../write/BoardCommentWrite";
import { gql, useQuery } from "@apollo/client";
import type {
  IQueryFetchUseditemQuestionAnswersArgs,
  IQuery,
  IQueryFetchUseditemQuestionsArgs,
} from "../../../../commons/types/generated/types";
import { v4 as uuidv4 } from "uuid";

const ItemWrapper = styled.div`
  width: 1320px;
  margin: 0px 100px;
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
`;
const Contents = styled.div`
  font-size: 20px;
`;

const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
const UpdateIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;
const DeleteIcon = styled.img`
  width: 24px;
  height: 24px;
  cursor: pointer;
`;

const DateString = styled.div`
  color: lightgray;
  padding-top: 15px;
  padding-left: 60px;
`;

const Star = styled(Rate)`
  padding-left: 20px;
`;

const PasswordModal = styled(Modal)``;

const PasswordInput = styled.input`
  width: 100%;
  margin-top: 10px;
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

const FETCH_USED_ITEM_QUESTION_ANSWER = gql`
  query fetchUseditemQuestionAnswers($page: Int, $useditemQuestionId: ID!) {
    fetchUseditemQuestionAnswers(
      page: $page
      useditemQuestionId: $useditemQuestionId
    ) {
      _id
      contents
      useditemQuestion {
        _id
        contents
        useditem
      }
      user {
        _id
        email
        name
      }
    }
  }
`;

interface IProps {
  useditemId: string | undefined;
}

export default function BoardCommentListUIItem(props: IProps): JSX.Element {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const { data: questions } = useQuery<
    Pick<IQuery, "fetchUseditemQuestions">,
    IQueryFetchUseditemQuestionsArgs
  >(FETCH_USED_ITEM_QUESTIONS, {
    variables: {
      page: 1,
      useditemId: props.useditemId ?? "",
    },
  });

  const { data: answer } = useQuery<
    Pick<IQuery, "fetchUseditemQuestionAnswers">,
    IQueryFetchUseditemQuestionAnswersArgs
  >(FETCH_USED_ITEM_QUESTION_ANSWER, {
    variables: {
      page: 1,
      useditemQuestionId: "",
    },
  });

  console.log("Questions::", questions);
  console.log("Answer::", answer);

  return (
    <>
      <BoardCommentWriteUI useditemId={props.useditemId} />
      {isOpenDeleteModal && (
        <PasswordModal visible={true}>
          <div>비밀번호 입력: </div>
          <PasswordInput type="password" />
        </PasswordModal>
      )}
      <ItemWrapper>
        <FlexWrapper>
          {questions?.fetchUseditemQuestions.map((el) => (
            <QuestionAnswerBox key={uuidv4()}>
              <Avatar src="/icon/user.svg" />
              <MainWrapper>
                <WriterWrapper>
                  <Writer>{el.user.name}</Writer>
                </WriterWrapper>
                <Contents>{el.contents}</Contents>
              </MainWrapper>
              <OptionWrapper>
                <UpdateIcon src="/icon/update.svg" />
                <DeleteIcon src="/icon/close.svg" />
              </OptionWrapper>
            </QuestionAnswerBox>
          ))}
        </FlexWrapper>
        {/* <DateString>11</DateString> */}
      </ItemWrapper>
    </>
  );
}
