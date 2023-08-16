import styled from "@emotion/styled";
import { Fragment } from "react";
import { HeartFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { gql, useQuery } from "@apollo/client";
import { type IQuery } from "../../../../commons/types/generated/types";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: grid;
  width: 100%;
  max-width: 1320px;
  border-radius: 10px;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: 400px;
  grid-gap: 20px;
  padding: 5px;
  margin-bottom: 10px;

  @media screen and (max-width: ${Phone - 1}px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(4, 200px);
  }
  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: 400px 400px;
  }
  @media screen and (min-width: ${Monitor}) {
  }
`;

const TitleBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  max-width: 1320px;
  height: 50px;

  margin: 10px;
`;

const Title = styled.span`
  font-size: 2rem;
  font-weight: 800;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 100%;

  border: 1px solid #bdbdbd;
  border-radius: 10px;
  padding: 10px;

  cursor: pointer;

  :hover {
    background-color: #f0f0f0;
  }
`;

const ImageBox = styled.div`
  display: flex;
  width: 100%;
  height: calc(100% - 100px);
`;

const Image = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
  border-radius: 10px;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: calc(100% - 30px);
  height: 100px;

  border-radius: 10px;
`;

const TextTitle = styled.p`
  width: 200px;
  height: 25px;
  font-size: 20px;
  color: black;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const TextContents = styled.p`
  width: 200px;
  height: 25px;
  font-size: 18px;
  color: #4f4f4f;
  font-weight: 600;

  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
`;

const TextPrice = styled.p`
  font-size: 18px;
  color: black;
  font-weight: 800;
`;

const HeartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 30px;
`;

const Heart = styled(HeartFilled)`
  font-size: 20px;
  color: red;
  margin: 0px 10px;

  cursor: pointer;
`;

const HeartNum = styled.span`
  font-size: 14px;
  /* text-align: center; */
`;

const FETCH_USED_ITEM_BEST = gql`
  query {
    fetchUseditemsOfTheBest {
      name
      contents
      price
      pickedCount
    }
  }
`;

export default function BestItem(): JSX.Element {
  const { data } =
    useQuery<Pick<IQuery, "fetchUseditemsOfTheBest">>(FETCH_USED_ITEM_BEST);

  console.log("data::", data?.fetchUseditemsOfTheBest);
  return (
    <>
      <TitleBox>
        <Title>Best Item</Title>
      </TitleBox>
      <Wrapper>
        {data?.fetchUseditemsOfTheBest.map((el) => (
          <Fragment key={uuidv4()}>
            <Item>
              <ImageBox>
                <Image
                  src={`http://storage.googleapis.com/${el.images?.[0]}`}
                  onError={(e) => {
                    e.currentTarget.src = "/no_image.png";
                  }}
                />
              </ImageBox>
              <TextWrapper>
                <TextBox>
                  <TextTitle>{el.name}</TextTitle>
                  <TextContents
                    dangerouslySetInnerHTML={{ __html: `${el.contents}` }}
                  />
                  <TextPrice>{el.price}원</TextPrice>
                </TextBox>
                <HeartBox>
                  <Heart />
                  <HeartNum>{el.pickedCount}</HeartNum>
                </HeartBox>
              </TextWrapper>
            </Item>
          </Fragment>
        ))}
      </Wrapper>
    </>
  );
}
