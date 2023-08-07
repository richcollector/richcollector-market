import styled from "@emotion/styled";
import { SearchOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";
import Paginations01 from "../../../commons/paginations/01/Paginations01.container";
import FloatingMyPage from "../floating";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 0 1fr;
  grid-template-rows: 1fr;

  width: 1320px;
  border-radius: 10px;

  margin: 50px 0px;

  @media screen and (max-width: ${Phone - 1}px) {
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(8, 400px);
  }
  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 400px);
  }
  @media screen and (min-width: ${Monitor}) {
  }
`;

const BoardBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 1000px;
`;

const PaginationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
`;

const BoardMenu = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
`;

const Boardcontents = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(11, 1fr);

  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

const BoardColumnTitle = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
`;

const ColumnTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

const BoardColumnContent = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
`;

const CoulumnContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  border-top: 1px solid #bdbdbd;
`;

const MenuTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const MenuTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 600;
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

const LineBox = styled.div`
  display: flex;
  height: 20px;
  border: 1px solid #bdbdbd;
  margin: 0 20px;
`;

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

const Searchbar = styled.div`
  width: 400px;
  height: 50px;
  border-radius: 15px;
  background-color: #f5f2fc;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
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

const SearchBtn = styled.button`
  width: 100px;
  height: 50px;

  font-size: 20px;

  color: white;
  background-color: black;

  cursor: pointer;
`;

const BlankBox = styled.div`
  position: relative;
  height: 100%;
`;

export default function MyPageBoard(): JSX.Element {
  return (
    <>
      <Wrapper>
        <BlankBox>
          <FloatingMyPage></FloatingMyPage>
        </BlankBox>
        <BoardBox>
          <BoardMenu>
            <MenuTitleBox>
              <MenuTitle>나의상품</MenuTitle>
              <LineBox />
              <MenuTitle>마이찜</MenuTitle>
            </MenuTitleBox>
            <SearchBox>
              <Searchbar>
                <Search />
                <SearchbarInput placeholder="검색어를 입력해 주세요." />
              </Searchbar>
              <SearchBtn>검색</SearchBtn>
            </SearchBox>
          </BoardMenu>
          <Boardcontents>
            <BoardColumnTitle>
              <ColumnTitle>번호</ColumnTitle>
              <ColumnTitle>상품명</ColumnTitle>
              <ColumnTitle>판매여부</ColumnTitle>
              <ColumnTitle>판매가격</ColumnTitle>
              <ColumnTitle>날짜</ColumnTitle>
            </BoardColumnTitle>
            {new Array(10).fill("").map((el, index) => (
              <BoardColumnContent key={uuidv4()}>
                <CoulumnContent>{index + 1}</CoulumnContent>
                <CoulumnContent>아이폰팝니다.</CoulumnContent>
                <CoulumnContent>판매완료</CoulumnContent>
                <CoulumnContent>100,000원</CoulumnContent>
                <CoulumnContent>2022.09.25</CoulumnContent>
              </BoardColumnContent>
            ))}
          </Boardcontents>
          <PaginationBox>
            <Paginations01 />
          </PaginationBox>
        </BoardBox>
      </Wrapper>
    </>
  );
}
