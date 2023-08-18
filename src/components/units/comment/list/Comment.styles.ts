import styled from "@emotion/styled";

export const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

export const QuestionAnswerBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  border-bottom: 2px solid #ededed;
  padding-bottom: 20px;
  width: 100%;

  margin-bottom: 30px;
`;

export const Arrow = styled.img`
  width: 24px;
  height: 24px;

  margin-right: 10px;
`;

export const Avatar = styled.img`
  width: 48px;
  height: 48px;
`;

export const MainWrapper = styled.div`
  width: 100%;
  padding-left: 10px;
`;

export const WriterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Writer = styled.div`
  font-size: 30px;
  font-weight: bold;

  margin-bottom: 10px;
`;
export const Contents = styled.div`
  font-size: 20px;
`;

export const OptionWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;
export const Icon = styled.img`
  width: 24px;
  height: 24px;

  margin-left: 10px;
  cursor: pointer;
`;

export const DateString = styled.div`
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

export const ErrorBox = styled.div`
  width: 100%;
  height: 20px;
  color: red;
  font-size: 15px;
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
