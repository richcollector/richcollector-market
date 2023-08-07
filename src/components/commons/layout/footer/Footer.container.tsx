import styled from "@emotion/styled";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  background: #3d3d3d;
`;

const Footer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  width: 100%;
  max-width: 1320px;

  color: #eeeeee;
  padding: 20px 0;
`;

const TextBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
`;

const FooterText = styled.div`
  font-size: 20px;

  padding: 3px 0;
`;

const FOOTER_MENU = [{}];

const FOOTER_INFO = [
  {
    name: "companyInfo",
    content:
      "상호명 : (주)리치컬렉터 / 대표이사: 김태완 / 주소: 태완특별시 태완시 태완구 태완빌딩",
  },
  {
    name: "companyTel",
    content:
      "Tel: 010-3919-9115 (정확한 상담을 위해 통화내용이 저장됩니다. ) Fax : 02-1234-1234 메일 : ktw9115@naver.com",
  },
  {
    name: "companyCertification",
    content:
      "사업자등록번호 : 101-00-910105 통신판매업 신고번호 : 제01 – 0000호",
  },
  {
    name: "companyResponsibility",
    content:
      "(주)리치컬렉터는 통신판매중개자로서 (주)리치컬렉터가 매도인인 경우를 제외하고, 사이트 상에 등록된 모든 상품과 그 내용에 대하여 책임을 지지 않습니다.",
  },
  {
    name: "companyCopyright",
    content: "Copyright(c) 1991, richcollector, lnc All rights reserved.",
  },
];

export default function LayoutFooter(): JSX.Element {
  return (
    <>
      <Wrapper>
        <Footer>
          <TextBox>
            {FOOTER_INFO.map((el) => (
              <FooterText key={el.name}>{el.content}</FooterText>
            ))}
          </TextBox>
        </Footer>
      </Wrapper>
    </>
  );
}
