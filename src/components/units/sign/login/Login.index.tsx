import Link from "next/link";
import * as S from "./Login.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./Login.validation";

export default function Sign() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  return (
    <S.Wrapper>
      <S.SignBox>
        <S.LogoBox>
          <S.Logo src="/richcollector.png" />
        </S.LogoBox>

        <S.InputBox>
          <S.InputCommon type="text" placeholder="이메일을 입력해주세요." />
          <S.ErrorCommon></S.ErrorCommon>
          <S.InputCommon
            type="password"
            placeholder="비밀번호를 입력해주세요."
          />
          <S.ErrorCommon></S.ErrorCommon>
        </S.InputBox>

        <S.LoginBox>
          <S.LoginMaintainBox>
            <label>
              <S.InputCheck type="checkbox" />
              <S.Text>로그인 상태 유지</S.Text>
            </label>
          </S.LoginMaintainBox>
          <S.SignBtn>로그인하기</S.SignBtn>
        </S.LoginBox>

        <S.LineBox />

        <S.TextBox>
          <Link href="/">
            <S.TextLink>이메일찾기</S.TextLink>
          </Link>
          <S.DivisionLine />
          <Link href="">
            <S.TextLink>비밀번호찾기</S.TextLink>
          </Link>
          <S.DivisionLine />
          <Link href="/signup">
            <S.TextLink>회원가입</S.TextLink>
          </Link>
        </S.TextBox>

        <Link href="/">
          <S.TextLink>
            <S.XIcon src="/icon/close.svg" />
          </S.TextLink>
        </Link>
      </S.SignBox>
    </S.Wrapper>
  );
}
