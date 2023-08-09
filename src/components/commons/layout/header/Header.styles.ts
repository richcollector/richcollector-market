import styled from "@emotion/styled";

export const breakpoints = [768, 1024];

export const [Phone, Monitor] = breakpoints;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  background: #2f4e7c;
`;

export const Header = styled.div`
  height: 70px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  max-width: 1320px;

  padding: 0 10px;

  @media screen and (max-width: ${Phone - 1}px) {
    display: none;
  }

  @media screen and (min-width: ${Phone}) and (max-width: ${Monitor - 1}px) {
  }

  @media screen and (min-width: ${Monitor}) {
  }
`;

export const HeaderTextBox = styled.div`
  display: flex;
  flex-direction: row;
`;

export const HeaderText = styled.div`
  font-size: 20px;
  color: #ececec;
  padding: 0 10px;

  cursor: pointer;
`;
