import { Fragment, type MouseEvent } from "react";
import styled from "@emotion/styled";
import { MenuOutlined, DoubleRightOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { accessTokenState } from "../../../../commons/store";
import { useAuthCheck } from "../../hooks/customs/useAuthCheck";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  border-bottom: 1px solid #bdbdbd;
  /* box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2); */
`;

const Bar = styled.div`
  width: 100%;
  max-width: 1320px;
  height: 70px;
  display: flex;
  flex-direction: row;
  align-items: center;
  @media screen and (max-width: ${Phone - 1}px) {
    border-top: 5px solid #2f4e7c;
  }

  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }

  @media screen and (min-width: ${Monitor}px) {
  }
`;

const MainMenu = styled.div`
  width: 100%;
  display: flex;

  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const MainMenuDiv = styled.div``;

const MenuLink = styled.div`
  text-decoration: none;
  font-size: 20px;
  font-weight: 600;
  color: #111;

  border-radius: 20px;
  padding-left: 10px;
  padding: 10px;
  transition: all 0.3s ease-in-out;

  cursor: pointer;

  :hover {
    padding-left: 20px;
    background: #eeeeee;
  }

  :active {
    font-weight: 800;
    color: red;
  }

  @media screen and (max-width: ${Phone - 1}px) {
    display: none;
  }

  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }

  @media screen and (min-width: ${Monitor}px) {
  }
`;

const MainMenuBtn = styled.button`
  width: 150px;
  background: #2f4e7c;

  font-size: 20px;
  color: white;
  text-align: left;

  border-radius: 5px;
  padding: 5px 10px;
  border: 0;

  cursor: pointer;

  :hover {
    background: white;
    border: 1px solid #2f4e7c;
    color: #2f4e7c;
  }
  :hover .Arrow {
    transform: translateX(20px);
  }

  @media screen and (max-width: ${Phone - 1}px) {
    display: none;
  }

  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }

  @media screen and (min-width: ${Monitor}px) {
  }
`;

const MenuIcon = styled.div`
  display: none;
  cursor: pointer;
  @media screen and (max-width: ${Phone - 1}px) {
    display: flex;
  }

  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }

  @media screen and (min-width: ${Monitor}px) {
  }
`;

const Arrow = styled(DoubleRightOutlined)`
  display: inline-block;
  padding-left: 10px;
  transition: all 0.3s ease-in-out;
`;

const MainLogo = styled.a`
  text-decoration: none;
  :visited {
    color: black;
  }
`;

const Logo = styled.img`
  height: 40px;
  @media screen and (max-width: ${Phone - 1}px) {
    height: 25px;
  }
`;

const NAVIGATION_MENUS = [
  { name: "중고마켓", page: "/" },
  { name: "마이페이지", page: "/mypage" },
];

export default function LayoutNavigation(): JSX.Element {
  const router = useRouter();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

  const onClickMenu = (event: MouseEvent<HTMLDivElement>): void => {
    event.preventDefault();
    void router.push(event.currentTarget.id);
  };

  const onClickRegister = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    void router.push(event.currentTarget.id);
  };

  return (
    <>
      <Wrapper>
        <Bar>
          <MainMenu>
            <MenuIcon>
              <MenuOutlined />
            </MenuIcon>
            <MainMenuDiv>
              <MainLogo href="/">
                <Logo src="/RichCollector.png"></Logo>
              </MainLogo>
            </MainMenuDiv>
            {NAVIGATION_MENUS.map((el) => (
              <Fragment key={el.page}>
                <MenuLink id={el.page} onClick={onClickMenu}>
                  {el.name}
                </MenuLink>
              </Fragment>
            ))}
            <MainMenuDiv>
              <MainMenuBtn id={"/market/new"} onClick={onClickRegister}>
                물품등록 <Arrow className="Arrow" />
              </MainMenuBtn>
            </MainMenuDiv>
          </MainMenu>
        </Bar>
        <div className="writeBtn"></div>
      </Wrapper>
    </>
  );
}
