import styled from "@emotion/styled";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const FloatingMenuBox = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 70px 200px 1fr;
  position: absolute;

  left: -240px;
  width: 200px;
  height: 1000px;

  border-right: 1px solid #bdbdbd;
`;

const FloatingMenuTitle = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  font-size: 30px;
  font-weight: 600;
`;

const UserInfoBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 200px;

  margin-top: 30px;
`;

const MenuImage = styled.img`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100px;
  height: 100px;

  border-radius: 50%;
`;

const UserName = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 20px;
  font-weight: 600;
`;

const Money = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  width: 100%;
  height: 100%;

  font-size: 20px;
  font-weight: 600;
  gap: 10px;
`;

const MenuBox = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin-top: 100px;
`;

const Menu = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  font-size: 20px;
  font-weight: 600;
  gap: 10px;

  cursor: pointer;

  color: #bdbdbd;

  :hover {
    color: #000000;
    font-weight: 800;
  }

  :active {
    color: #000000;
    font-weight: 800;
  }
`;

const IconImg = styled.img``;

export default function FloatingMyPage(): JSX.Element {
  return (
    <FloatingMenuBox>
      <FloatingMenuTitle>MyPage</FloatingMenuTitle>
      <UserInfoBox>
        <MenuImage src="/taewan.jpg" />
        <UserName>로건</UserName>
        <Money>
          <IconImg src="/icon/money.svg" />
          100,000원
        </Money>
      </UserInfoBox>
      <MenuBox>
        <Menu>
          <IconImg src="/icon/cart.svg" />내 장터
        </Menu>
        <Menu>
          <IconImg src="/icon/money.svg" />내 포인트
        </Menu>
        <Menu>
          <IconImg src="/icon/profile.svg" />내 프로필
        </Menu>
      </MenuBox>
    </FloatingMenuBox>
  );
}
