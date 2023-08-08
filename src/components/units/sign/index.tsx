import styled from "@emotion/styled";
import Link from "next/link";
import { CloseCircleOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 100dvw;
  height: 100dvh;
  background-color: rgb(47, 78, 124, 0.2);

  @media screen and (max-width: ${Phone - 1}px) {
  }
  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }
  @media screen and (min-width: ${Monitor}) {
  }
`;

const SignBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  width: 440px;
  height: 600px;
  border: 1px solid #bdbdbd;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const LogoBox = styled.div`
  width: 384px;
  height: 64px;

  text-align: center;
`;

const Logo = styled.img`
  width: 250px;
`;

const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  gap: 10px;
`;

const InputCommon = styled.input`
  width: 384px;
  height: 50px;
  padding: 10px;

  font-size: 20px;

  border-radius: 16px;
  border: 1px solid #bdbdbd;
`;

const ErrorCommon = styled.div`
  width: 384px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  color: red;
`;

const SignBtn = styled.button`
  width: 384px;
  height: 50px;

  font-size: 20px;

  color: white;
  background-color: #bdbdbd;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #2f4e7c;
  }
`;

const LineBox = styled.div`
  display: flex;
  width: 384px;
  border: 1px solid #bdbdbd;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 384px;
  border-radius: 16px;
`;

const LoginMaintainBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;

  width: 384px;
  border-radius: 16px;
`;

const TextLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

const DivisionLine = styled.div`
  border: 1px solid #bdbdbd;
`;

const Text = styled.span`
  font-size: 20px;
`;

const XIcon = styled(CloseCircleOutlined)`
  font-size: 30px;
  position: fixed;
  top: 30px;
  right: 30px;

  color: white;
`;

const SignUpTitleBox = styled.div``;
const Label = styled.div``;

const CHANGE = ["/signup"];

export default function Sign(): JSX.Element {
  const router = useRouter();
  console.log("router asPath::", router.asPath);
  console.log("includes", CHANGE.includes(router.asPath));

  const isChange = CHANGE.includes(router.asPath);
  return (
    <>
      <Wrapper>
        <SignBox>
          {isChange ? (
            <>
              <SignUpTitleBox>
                <h1>회원가입</h1>
              </SignUpTitleBox>
              <InputBox>
                <Label>이메일</Label>
                <InputCommon />
                <ErrorCommon></ErrorCommon>
              </InputBox>
              <InputBox>
                <Label>이름</Label>
                <InputCommon />
                <ErrorCommon></ErrorCommon>
              </InputBox>
              <InputBox>
                <Label>비밀번호</Label>
                <InputCommon />
                <ErrorCommon></ErrorCommon>
              </InputBox>
              <InputBox>
                <Label>비밀번호 확인</Label>
                <InputCommon />
                <ErrorCommon></ErrorCommon>
              </InputBox>
              <SignBtn>회원가입하기</SignBtn>
            </>
          ) : (
            <>
              <LogoBox>
                <Logo src="/richcollector.png" />
              </LogoBox>

              <InputBox>
                <InputCommon type="text" placeholder="이메일을 입력해주세요." />
                <ErrorCommon></ErrorCommon>
                <InputCommon
                  type="password"
                  placeholder="비밀번호를 입력해주세요."
                />
                <ErrorCommon></ErrorCommon>
                <LoginMaintainBox>
                  <Text>로그인 상태 유지</Text>
                </LoginMaintainBox>
                <SignBtn>로그인하기</SignBtn>
              </InputBox>

              <LineBox />

              <TextBox>
                <Link href="/">
                  <TextLink>이메일찾기</TextLink>
                </Link>
                <DivisionLine />
                <Link href="">
                  <TextLink>비밀번호찾기</TextLink>
                </Link>
                <DivisionLine />
                <Link href="">
                  <TextLink>회원가입</TextLink>
                </Link>
              </TextBox>
            </>
          )}
        </SignBox>

        <Link href="/">
          <TextLink>
            <XIcon />
          </TextLink>
        </Link>
      </Wrapper>
    </>
  );
}
