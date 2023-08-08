import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./SignUp.styles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./SignUp.validation";
import { wrapFormAsync } from "../../../../commons/libraries/asyncFunc";
import { useMutation, gql, useApolloClient } from "@apollo/client";
import type {
  IMutation,
  IMutationCreateUserArgs,
} from "../../../../commons/types/generated/types";

interface IFormData {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
}

const CREATE_USER = gql`
  mutation createUser($createUserInput: CreateUserInput!) {
    createUser(createUserInput: $createUserInput) {
      _id
      email
      name
      picture
      createdAt
    }
  }
`;

const CHANGE = ["/signup"];

export default function Sign(): JSX.Element {
  const router = useRouter();

  const [createUser] = useMutation<
    Pick<IMutation, "createUser">,
    IMutationCreateUserArgs
  >(CREATE_USER);

  const { register, handleSubmit, formState } = useForm<IFormData>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onClickSubmit = async (data: IFormData): Promise<void> => {
    console.log(data);
    const result = await createUser({
      variables: {
        createUserInput: {
          email: data.email,
          name: data.name,
          password: data.password,
        },
      },
    });
    console.log(result.data?.createUser);
    void router.push("/login");
  };

  console.log("router asPath::", router.asPath);
  console.log("includes", CHANGE.includes(router.asPath));

  const isChange = CHANGE.includes(router.asPath);
  return (
    <>
      <S.Wrapper>
        <S.SignBox>
          {isChange ? (
            <>
              <S.Form onSubmit={wrapFormAsync(handleSubmit(onClickSubmit))}>
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
                  <S.ErrorCommon>
                    {formState.errors.email?.message}
                  </S.ErrorCommon>
                </S.InputBox>
                <S.InputBox>
                  <S.Label>이름</S.Label>
                  <S.InputCommon
                    type="text"
                    placeholder="이름을 입력해주세요."
                    {...register("name")}
                  />
                  <S.ErrorCommon>
                    {formState.errors.name?.message}
                  </S.ErrorCommon>
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
                  type="submit"
                  style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
                >
                  회원가입하기
                </S.SignBtn>
              </S.Form>
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

        <Link href="/">
          <S.TextLink>
            <S.XIcon>X</S.XIcon>
          </S.TextLink>
        </Link>
      </S.Wrapper>
    </>
  );
}
