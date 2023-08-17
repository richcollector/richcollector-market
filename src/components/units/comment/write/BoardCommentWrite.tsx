import styled from "@emotion/styled";
import { Modal, Rate } from "antd";
import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationCreateUseditemQuestionArgs,
} from "../../../../commons/types/generated/types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./BoardCommentWrite.validation";

export const Wrapper = styled.div`
  width: 1320px;
  height: 100%;
  margin: 0px 100px;
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

export const Star = styled(Rate)``;

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
}

export default function BoardCommentWriteUI(props: IProps): JSX.Element {
  const { handleSubmit, register, setValue, trigger, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const [createQuestion] = useMutation<
    Pick<IMutation, "createUseditemQuestion">,
    IMutationCreateUseditemQuestionArgs
  >(CREATE_USED_ITEM_QUESTION);

  const onClickCreate = async (data: any) => {
    try {
      const result = await createQuestion({
        variables: {
          createUseditemQuestionInput: {
            contents: data.contents,
          },
          useditemId: props.useditemId ?? "",
        },
      });
    } catch (error) {
      if (error instanceof Error) console.log("error::", error.message);
    }
  };

  return (
    <Wrapper>
      <>
        <PencilIcon />
        <span>댓글</span>
      </>
      <InputWrapper>
        <Input placeholder="작성자" />
        <Input type="password" placeholder="비밀번호" />
        <Star />
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
        </BottomWrapper>
      </ContentsWrapper>
    </Wrapper>
  );
}
