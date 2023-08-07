import styled from "@emotion/styled";
import { HeartFilled } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const Container = styled.div`
  display: inline-block;
  position: absolute;
  left: 20px;

  width: 100%;
  height: 100%;
  padding-left: 10px;

  z-index: 99;
  @media screen and (max-width: 1320px) {
    display: none;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 50px repeat(2, 1fr);
  grid-gap: 10px;
  position: sticky;
  top: 20px;

  width: 200px;
  height: 600px;

  border: 1px solid #bdbdbd;
  border-radius: 10px;

  padding: 10px;
  background-color: white;
`;

const FloatingTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  height: 100%;

  font-size: 20px;
  font-weight: 800;
`;

const ItemWrapper = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeartBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  justify-content: center;
`;

const Heart = styled(HeartFilled)`
  font-size: 20px;
  color: red;
  margin: 0px 10px;

  cursor: pointer;
`;

const HeartNum = styled.span`
  font-size: 15px;
`;

const ItemName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const Item = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  border: 1px solid #bdbdbd;
  padding: 10px;

  :hover {
    background-color: #f0f0f0;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 150px;
  object-fit: cover;
  border-radius: 10px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
`;

const ContentsTitle = styled.p`
  font-size: 16px;
  color: black;
  font-weight: 600;
`;
const ContentsEx = styled.p`
  font-size: 12px;
  color: #4f4f4f;
  font-weight: 600;
`;
const ContentsPrice = styled.p`
  font-size: 14px;
  color: black;
  font-weight: 800;
`;

export default function FlotiongItem(): JSX.Element {
  return (
    <>
      <Container>
        <Wrapper>
          <ItemName>
            <FloatingTitle>오늘 본 상품</FloatingTitle>
          </ItemName>
          {new Array(2).fill("").map((el) => (
            <Item key={uuidv4()}>
              <Image src="/taewan.jpg"></Image>
              <ItemWrapper>
                <ContentsBox>
                  <ContentsTitle>무엇이 올까요</ContentsTitle>
                  <ContentsEx>기능성이 좋음</ContentsEx>
                  <ContentsPrice>000,000원</ContentsPrice>
                </ContentsBox>
                <HeartBox>
                  <Heart />
                  <HeartNum>0</HeartNum>
                </HeartBox>
              </ItemWrapper>
            </Item>
          ))}
        </Wrapper>
      </Container>
    </>
  );
}
