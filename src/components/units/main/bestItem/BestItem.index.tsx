import { Fragment } from "react";
import { v4 as uuidv4 } from "uuid";
import { gql, useQuery } from "@apollo/client";
import { type IQuery } from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import * as S from "./BestItem.styles";

const FETCH_USED_ITEM_BEST = gql`
  query {
    fetchUseditemsOfTheBest {
      _id
      name
      contents
      price
      remarks
      pickedCount
    }
  }
`;

export default function BestItem(): JSX.Element {
  const router = useRouter();
  const { data } =
    useQuery<Pick<IQuery, "fetchUseditemsOfTheBest">>(FETCH_USED_ITEM_BEST);

  const onClickMoved = (useditemId: string) => () => {
    void router.push(`/market/${useditemId}`);
  };

  return (
    <>
      <S.TitleBox>
        <S.Title>Best Item</S.Title>
      </S.TitleBox>
      <S.Wrapper>
        {data?.fetchUseditemsOfTheBest.map((el) => (
          <Fragment key={uuidv4()}>
            <S.Item onClick={onClickMoved(el._id)}>
              <S.ImageBox>
                <S.Image
                  src={
                    el.images?.[0]?.includes("codecamp-file-storage")
                      ? `http://storage.googleapis.com/${el.images?.[0]}`
                      : "/no_image.png"
                  }
                />
              </S.ImageBox>
              <S.TextWrapper>
                <S.TextBox>
                  <S.TextTitle>{el.name}</S.TextTitle>
                  <S.TextContents>{el.remarks}</S.TextContents>
                  <S.TextPrice>{el.price}원</S.TextPrice>
                </S.TextBox>
                <S.HeartBox>
                  <S.Heart />
                  <S.HeartNum>{el.pickedCount}</S.HeartNum>
                </S.HeartBox>
              </S.TextWrapper>
            </S.Item>
          </Fragment>
        ))}
      </S.Wrapper>
    </>
  );
}
