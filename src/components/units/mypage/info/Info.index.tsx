import ChargeModal from "../charge/Charge.index";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";
import { type Dispatch, type SetStateAction } from "react";
import * as S from "./Info.styles";

interface IProps {
  bigMenu: string;
  setBigMenu: Dispatch<SetStateAction<string>>;
}

export default function Info({ bigMenu, setBigMenu }: IProps) {
  const [info, setInfo] = useRecoilState(userInfomation);

  return (
    <S.FloatingMenuBox>
      <S.FloatingMenuTitle>MyPage</S.FloatingMenuTitle>
      <S.UserInfoBox>
        <S.MenuImage src="/taewan.jpg" />
        <S.UserName>{info[0]?.name}</S.UserName>
        <S.Money>
          <S.IconImg src="/icon/money.svg" />
          {info[0]?.userPoint?.amount}원
        </S.Money>
      </S.UserInfoBox>
      <S.MenuBox>
        <S.Menu
          style={bigMenu === "1" ? S.activeStyle : {}}
          onClick={() => {
            setBigMenu("1");
          }}
        >
          <S.IconImg src="/icon/cart.svg" />내 장터
        </S.Menu>
        <S.Menu
          style={bigMenu === "2" ? S.activeStyle : {}}
          onClick={() => {
            setBigMenu("2");
          }}
        >
          <S.IconImg src="/icon/money.svg" />내 포인트
        </S.Menu>
        <S.Menu
          style={bigMenu === "3" ? S.activeStyle : {}}
          onClick={() => {
            setBigMenu("3");
          }}
        >
          <S.IconImg src="/icon/profile.svg" />내 프로필
        </S.Menu>
        <S.Menu>
          <ChargeModal />
        </S.Menu>
      </S.MenuBox>
    </S.FloatingMenuBox>
  );
}
