import styled from "@emotion/styled";
import { Fragment, type MouseEvent } from "react";
import { HeartFilled, SearchOutlined, DollarOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";

const SellTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1320px;
  height: 100px;

  margin-bottom: 10px;
`;

const SellTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;

  width: 400px;
`;

const SellSearch = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: calc(100% - 400px);
`;

const TitleText = styled.span`
  font-size: 22px;
  font-weight: 400;
  margin-left: 20px;

  cursor: pointer;

  :hover {
    font-weight: 800;
    border-bottom: 2px solid orange;
  }

  :active {
    font-weight: 800;
    border-bottom: 2px solid orange;
  }
`;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(5, 200px);
  width: 100%;
  max-width: 1320px;
  height: 1000px;

  box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
  margin-bottom: 40px;
  border-top: 1px solid #bdbdbd;
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 10px;
  }
  ::-webkit-scrollbar-thumb {
    height: 30%; /* 스크롤바의 길이 */
    background: #2f4e7c; /* 스크롤바의 색상 */

    border-radius: 10px;
  }
  ::-webkit-scrollbar-track {
    /* background: rgba(33, 122, 244, 0.1); 스크롤바 뒷 배경 색상 */
  }
`;

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: end;
  align-items: end;
`;

const ItemBtn = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 150px;
  height: 60px;

  font-size: 20px;

  margin-bottom: 30px;
  border: 1px solid #bdbdbd;
  border-radius: 10px;

  cursor: pointer;
`;

const ItemBox = styled.div`
  display: grid;
  grid-template-columns: 1fr calc(100% - 400px) 1fr;
  grid-template-rows: 1fr;
  grid-gap: 20px;

  width: 100%;
  height: 200px;
  padding: 10px 10px;
  border-bottom: 1px solid #bdbdbd;

  cursor: pointer;

  :hover {
    background-color: #f0f0f0;
  }
`;

const ImageBox = styled.img`
  width: 100%;
  height: 100%;

  border-radius: 10px;
`;

const ContentsBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;

  width: 100%;
  height: 100%;
`;

const PriceBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 100%;
`;

const Heart = styled(HeartFilled)`
  font-size: 20px;
  color: red;
  margin: 0px 10px;

  cursor: pointer;
`;

const UserImg = styled.img`
  width: 25px;
  height: 25px;
  margin-right: 10px;
`;

const Searchbar = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 300px;
  height: 50px;

  border-radius: 15px;
  background-color: #f5f2fc;
  padding: 0px 20px;
`;

const Search = styled(SearchOutlined)`
  color: #5729ff;
  font-size: 30px;

  cursor: pointer;

  :hover {
    color: red;
  }
`;

const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;

  font-size: 20px;

  margin: 0px 20px;
`;

const InputStartDay = styled.input`
  width: 150px;
  height: 50px;
  border: none;
  outline: none;
  background: none;

  font-size: 20px;
`;

const InputEndDay = styled.input`
  width: 150px;
  height: 50px;
  border: none;
  outline: none;
  background: none;

  font-size: 20px;
`;

const SearchBtn = styled.button`
  width: 100px;
  height: 50px;
  border: none;
  border-radius: 10px;
  font-size: 20px;
`;

const ContentsTitle = styled.p`
  font-size: 20px;
  color: black;
  font-weight: 600;
`;
const ContentsEx = styled.p`
  font-size: 18px;
  color: #4f4f4f;
  font-weight: 600;
`;
const ContentsHash = styled.p`
  font: 15px;
  color: #bdbdbd;
  font-weight: 800;
`;

const IconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

const IconText = styled.div`
  font-weight: 800;
  color: #4f4f4f;
  padding: 0;
`;

export default function SellItem(): JSX.Element {
  const router = useRouter();
  const onClickRegister = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    void router.push("/market/new");
  };
  return (
    <>
      <SellTitleBox>
        <SellTitle>
          <TitleText>판매중상품</TitleText>
          <TitleText>판매된상품</TitleText>
        </SellTitle>
        <SellSearch>
          <Searchbar>
            <Search />
            <SearchbarInput placeholder="검색어를 입력해 주세요." />
          </Searchbar>
          <InputStartDay type="date" />
          <InputEndDay type="date" />
          <SearchBtn>검색</SearchBtn>
        </SellSearch>
      </SellTitleBox>
      <Wrapper>
        {new Array(10).fill("").map((el) => (
          <Fragment key={uuidv4()}>
            <ItemBox>
              <ImageBox src="/taewan.jpg" />
              <ContentsBox>
                <ContentsTitle>리치컬렉터 김태완 엣지 1</ContentsTitle>
                <ContentsEx>2019 edition</ContentsEx>
                <ContentsHash>#삼성전자 #갤럭시 #가성비</ContentsHash>
                <IconBox>
                  <UserImg src="/icon/User.svg" />
                  <IconText>판매자</IconText>
                  <Heart />
                  <IconText>20</IconText>
                </IconBox>
              </ContentsBox>
              <PriceBox>
                <h2>28,370원</h2>
              </PriceBox>
            </ItemBox>
          </Fragment>
        ))}
      </Wrapper>
      <ButtonBox>
        <ItemBtn onClick={onClickRegister}>상품등록하기</ItemBtn>
      </ButtonBox>
    </>
  );
}
