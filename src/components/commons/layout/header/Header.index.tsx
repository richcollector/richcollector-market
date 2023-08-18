import { Fragment, useEffect, type MouseEvent } from "react";
import { useRouter } from "next/router";
import * as S from "./Header.styles";
import { accessTokenState, userInfomation } from "../../../../commons/store";
import { useRecoilState } from "recoil";
import { useQueryFetchUser } from "../../hooks/queries/useQueryFetchUser";
import { useMutationLogoutUser } from "../../hooks/mutation/useMutationLogoutUser";

const LOGOUT_HEADER_LIST = [
  { name: "리치컬렉터가 처음이신가요?", page: "" },
  { name: "로그인", page: "/login" },
  { name: "회원가입", page: "/signup" },
];

const LOGIN_HEADER_LIST = [
  { name: "마이페이지", page: "/mypage" },
  { name: "로그아웃", page: "/logout" },
];

export default function LayoutHeader() {
  const [info, setinfo] = useRecoilState(userInfomation);
  const Router = useRouter();
  const { data: userInfo } = useQueryFetchUser();
  const [logoutUser] = useMutationLogoutUser();
  const [accessToken, setAccessToken] = useRecoilState(accessTokenState);
  const onClickHeaderMenu = (event: MouseEvent<HTMLDivElement>) => {
    if (event.currentTarget.id === "/logout") {
      void logoutUser();
      setAccessToken("");
    } else {
      void Router.push(event.currentTarget.id);
    }
  };

  useEffect(() => {
    setinfo(String(userInfo?.fetchUserLoggedIn.email));
  }, [userInfo]);

  return (
    <>
      <S.Wrapper>
        <S.Header>
          <S.HeaderTextBox></S.HeaderTextBox>
          <S.HeaderTextBox>
            {accessToken ? (
              <>
                {userInfo && (
                  <S.HeaderText>
                    {userInfo.fetchUserLoggedIn.name}님 어서오세요!
                  </S.HeaderText>
                )}
                {LOGIN_HEADER_LIST.map((el) => (
                  <Fragment key={el.name}>
                    <S.HeaderText id={el.page} onClick={onClickHeaderMenu}>
                      {el.name}
                    </S.HeaderText>
                  </Fragment>
                ))}
              </>
            ) : (
              <>
                {LOGOUT_HEADER_LIST.map((el) => (
                  <Fragment key={el.name}>
                    <S.HeaderText id={el.page} onClick={onClickHeaderMenu}>
                      {el.name}
                    </S.HeaderText>
                  </Fragment>
                ))}
              </>
            )}
          </S.HeaderTextBox>
        </S.Header>
      </S.Wrapper>
    </>
  );
}
