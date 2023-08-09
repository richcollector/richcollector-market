import Link from "next/link";
import * as S from "./SignUp.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./SignUp.validation";
import { type IFormData } from "./SignUp.types";
import { useSignUp } from "../../../commons/hooks/customs/useSignUp";

export default function Sign() {
  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const { onClickSubmit } = useSignUp();
  const isChange = true;
  return (
    <>
      <S.Wrapper>
        <S.SignBox>
          {isChange ? (
            <>
              <S.SignUpTitleBox>
                <h1>회원가입</h1>
              </S.SignUpTitleBox>
              <S.InputBox>
                <S.Label>이메일</S.Label>
                <S.InputCommon
                  type="text"
                  placeholder="이메일을 입력해주세요."
                  {...register("email")}
                />
                <S.ErrorCommon>{formState.errors.email?.message}</S.ErrorCommon>
              </S.InputBox>
              <S.InputBox>
                <S.Label>이름</S.Label>
                <S.InputCommon
                  type="text"
                  placeholder="이름을 입력해주세요."
                  {...register("name")}
                />
                <S.ErrorCommon>{formState.errors.name?.message}</S.ErrorCommon>
              </S.InputBox>
              <S.InputBox>
                <S.Label>비밀번호</S.Label>
                <S.InputCommon
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                  {...register("password")}
                />
                <S.ErrorCommon>
                  {formState.errors.password?.message}
                </S.ErrorCommon>
              </S.InputBox>
              <S.InputBox>
                <S.Label>비밀번호 확인</S.Label>
                <S.InputCommon
                  type="password"
                  placeholder="비밀번호를 다시 입력해주세요."
                  {...register("passwordConfirm")}
                />
                <S.ErrorCommon>
                  {formState.errors.passwordConfirm?.message}
                </S.ErrorCommon>
              </S.InputBox>
              <S.SignBtn
                onClick={handleSubmit(onClickSubmit)}
                style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
              >
                회원가입하기
              </S.SignBtn>
              <Link href="/">
                <S.TextLink>
                  <S.XIcon src="/icon/close.svg" />
                </S.TextLink>
              </Link>
            </>
          ) : (
            <>
              <S.LogoBox>
                <S.Logo src="/richcollector.png" />
              </S.LogoBox>

              <S.InputBox>
                <S.InputCommon
                  type="text"
                  placeholder="이메일을 입력해주세요."
                />
                <S.ErrorCommon></S.ErrorCommon>
                <S.InputCommon
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                />
                <S.ErrorCommon></S.ErrorCommon>
                <S.LoginMaintainBox>
                  <S.Text>로그인 상태 유지</S.Text>
                </S.LoginMaintainBox>
                <S.SignBtn>로그인하기</S.SignBtn>
              </S.InputBox>

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
                <Link href="">
                  <S.TextLink>회원가입</S.TextLink>
                </Link>
              </S.TextBox>
            </>
          )}
        </S.SignBox>
      </S.Wrapper>
    </>
  );
}
