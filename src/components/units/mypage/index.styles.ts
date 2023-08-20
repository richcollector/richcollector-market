import styled from "@emotion/styled";

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

export const BlankBox = styled.div`
  position: relative;
  height: 100%;
`;
