import { Fragment, type MouseEvent } from "react";
import styled from "@emotion/styled";
import { useRouter } from "next/router";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;

  box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
  background: #2f4e7c;
`;

const Header = styled.div`
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

const HeaderTextBox = styled.div`
  display: flex;
  flex-direction: row;
`;

const HeaderText = styled.div`
  font-size: 20px;
  color: #ececec;
  padding: 0 10px;

  cursor: pointer;
`;

const HEADER_LIST = [
  { name: "리치컬렉터가 처음이신가요?", page: "/question" },
  { name: "로그인", page: "/login" },
  { name: "회원가입", page: "/signup" },
  { name: "마이페이지", page: "/mypage" },
];

export default function LayoutHeader(): JSX.Element {
  const Router = useRouter();
  const onClickHeaderMenu = (event: MouseEvent<HTMLDivElement>): void => {
    void Router.push(event.currentTarget.id);
  };

  return (
    <>
      <Wrapper>
        <Header>
          <HeaderTextBox></HeaderTextBox>
          <HeaderTextBox>
            {HEADER_LIST.map((el) => (
              <Fragment key={el.name}>
                <HeaderText id={el.page} onClick={onClickHeaderMenu}>
                  {el.name}
                </HeaderText>
              </Fragment>
            ))}
          </HeaderTextBox>
        </Header>
      </Wrapper>
    </>
  );
}
