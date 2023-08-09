import styled from "@emotion/styled";

export const breakpoints = [768, 1024];

export const [Phone, Monitor] = breakpoints;

export const Wrapper = styled.div`
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

export const SignBox = styled.div`
  display: flex;
  position: absolute;
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

export const LogoBox = styled.div`
  width: 384px;
  height: 64px;

  text-align: center;

  margin-bottom: 20px;
`;

export const Logo = styled.img`
  width: 250px;
`;

export const InputBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  height: 150px;
`;

export const InputCommon = styled.input`
  width: 384px;
  height: 40px;
  padding: 10px;

  font-size: 18px;

  border-radius: 5px;
  border: 1px solid #bdbdbd;
`;

export const ErrorCommon = styled.div`
  width: 384px;
  height: 20px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;

  color: red;
`;

export const SignBtn = styled.button`
  width: 384px;
  height: 50px;

  font-size: 20px;

  background-color: #bdbdbd;
  border: none;
  cursor: pointer;

  :hover {
    background-color: #2f4e7c;
  }
`;

export const LineBox = styled.div`
  display: flex;
  width: 384px;
  border: 1px solid #bdbdbd;
`;

export const TextBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;

  width: 384px;
  border-radius: 16px;
`;

export const LoginBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  height: 100px;
  border-radius: 16px;
`;

export const LoginMaintainBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const InputCheck = styled.input`
  margin-right: 10px;
`;

export const TextLink = styled.a`
  text-decoration: none;
  cursor: pointer;
`;

export const DivisionLine = styled.div`
  border: 1px solid #bdbdbd;
`;

export const Text = styled.span`
  font-size: 20px;
`;

export const XIcon = styled.img`
  font-size: 30px;
  position: absolute;
  top: 10px;
  right: 10px;
`;
