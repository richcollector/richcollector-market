import { useState } from "react";
import styled from "@emotion/styled";
import { Rate, Modal } from "antd";
import BoardCommentWriteUI from "../write/BoardCommentWrite";

const ItemWrapper = styled.div`
  width: 1320px;
  margin: 0px 100px;
  padding-top: 20px;
  height: 128px;
  border-bottom: 1px solid lightgray;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: row;
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

export default function BoardCommentListUIItem(): JSX.Element {
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);

  return (
    <>
      <BoardCommentWriteUI />
      {isOpenDeleteModal && (
        <PasswordModal visible={true}>
          <div>비밀번호 입력: </div>
          <PasswordInput type="password" />
        </PasswordModal>
      )}
      <ItemWrapper>
        <FlexWrapper>
          <Avatar src="taewan.jpg" />
          <MainWrapper>
            <WriterWrapper>
              <Writer>111</Writer>
              <Star disabled />
            </WriterWrapper>
            <Contents>111</Contents>
          </MainWrapper>
          <OptionWrapper>
            <UpdateIcon src="/icon/update.svg" />
            <DeleteIcon src="/icon/clear.svg" />
          </OptionWrapper>
        </FlexWrapper>
        {/* <DateString>11</DateString> */}
      </ItemWrapper>
    </>
  );
}
