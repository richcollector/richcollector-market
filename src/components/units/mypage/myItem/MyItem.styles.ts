import styled from "@emotion/styled";
import { SearchOutlined } from "@ant-design/icons";

export const breakpoints = [768, 1024];

export const [Phone, Monitor] = breakpoints;

export const Wrapper = styled.div`
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

export const BoardBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 1000px;
`;

export const PaginationBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 50px;
`;

export const BoardMenu = styled.div`
  display: flex;
  width: 100%;
  height: 80px;
`;

export const Boardcontents = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(11, 1fr);

  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

export const BoardColumnTitle = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
`;

export const ColumnTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
`;

export const BoardColumnContent = styled.div`
  display: grid;
  width: 100%;
  height: 100%;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: 1fr;
`;

export const CoulumnContent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;

  border-top: 1px solid #bdbdbd;
`;

export const MenuTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`;

export const MenuTitle = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  font-size: 20px;
  font-weight: 600;
  cursor: pointer;

  :hover {
    font-weight: 800;
    border-bottom: 4px solid orange;
  }
`;

export const LineBox = styled.div`
  display: flex;
  height: 20px;
  border: 1px solid #bdbdbd;
  margin: 0 20px;
`;

export const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  gap: 20px;
`;

export const Searchbar = styled.div`
  width: 400px;
  height: 50px;
  border-radius: 15px;
  background-color: #f5f2fc;
  padding: 0px 20px;
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Search = styled(SearchOutlined)`
  color: #5729ff;
  font-size: 30px;
  cursor: pointer;

  :hover {
    color: red;
  }
`;

export const SearchbarInput = styled.input`
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  background: none;

  font-size: 20px;

  margin: 0px 20px;
`;

export const SearchBtn = styled.button`
  width: 100px;
  height: 50px;

  font-size: 20px;

  color: white;
  background-color: black;

  cursor: pointer;
`;

export const activeStyle = {
  fontWeight: 800,
  borderBottom: "4px solid orange",
};
