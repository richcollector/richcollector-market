import styled from "@emotion/styled";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 90px 150px 150px auto 150px 150px 450px 400px 100px 90px;

  width: 1320px;
  height: 100%;

  margin: 50px 0;
  border: 1px solid #bdbdbd;
  padding: 50px;

  @media screen and (max-width: ${Phone - 1}px) {
  }
  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }
  @media screen and (min-width: ${Monitor}) {
  }
`;

const TitleBox = styled.div`
  text-align: center;
`;

const InputBox = styled.div``;

const ExplainBox = styled.div`
  height: 100%;
  border: 1px solid red;
`;

const Label = styled.div`
  font-size: 20px;
  font-weight: 600;

  margin: 10px 0;
`;

const Input = styled.input`
  height: 50px;
  width: 100%;

  padding-left: 10px;

  font-size: 20px;
`;

const LocationBox = styled.div`
  display: grid;
  grid-template-columns: 500px auto;
`;

const ImgUploadBox = styled.div`
  display: grid;
  grid-template-rows: 50px 300px;
`;

const ImgUpload = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 300px;

  font-size: 20px;
  margin-right: 20px;

  border: 1px solid red;
`;

const InputRadio = styled.input`
  margin-right: 10px;
`;

const AreaBox = styled.div``;
const Area = styled.div`
  height: 350px;
  width: 450px;
  border: 1px solid blue;
`;

const GpsBox = styled.div`
  height: 150px;
`;

const AdressBox = styled.div`
  height: 150px;
`;

const DivideBox = styled.div``;

const IconImg = styled.img`
  margin: 0 10px;
`;

const InputMap = styled.input`
  width: 200px;
  height: 50px;

  font-size: 20px;

  padding-left: 15px;
`;

const AddressInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: first baseline;
  align-items: center;
`;

const RadioSpan = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

const Btn = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;

  cursor: pointer;
`;

const Close = styled.div`
  position: absolute;
  font-size: 30px;

  top: 10px;
  right: 10px;

  cursor: pointer;
`;

const ImgDivideBox = styled.div`
  display: flex;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export default function MarketWrite(): JSX.Element {
  return (
    <>
      <Wrapper>
        <TitleBox>
          <h2>상품 등록하기</h2>
        </TitleBox>
        <InputBox>
          <Label>상품명</Label>
          <Input placeholder="상품명을 입력해주세요." />
        </InputBox>
        <InputBox>
          <Label>한줄요약</Label>
          <Input placeholder="상품을 간단히 표현해주세요." />
        </InputBox>
        <ExplainBox>
          <Label placeholder="상품을 설명해주세요.">상품설명</Label>
        </ExplainBox>
        <InputBox>
          <Label placeholder="상품의 판매가격을 입력해주세요.">판매가격</Label>
          <Input />
        </InputBox>
        <InputBox>
          <Label>태그입력</Label>
          <Input placeholder="상품의 태그를 입력해주세요." />
        </InputBox>
        <LocationBox>
          <AreaBox>
            <Label>거래위치</Label>
            <Area></Area>
          </AreaBox>
          <DivideBox>
            <GpsBox>
              <Label>GPS</Label>
              <InputMap placeholder="위도(LAT)" />
              <IconImg src="/icon/location.svg" />
              <InputMap placeholder="경도(LNG)" />
            </GpsBox>
            <AdressBox>
              <Label>주소</Label>
              <AddressInput>
                <Input placeholder="주소" />
                <Input placeholder="상세주소" />
              </AddressInput>
            </AdressBox>
          </DivideBox>
        </LocationBox>
        <ImgUploadBox>
          <Label>사진첨부</Label>
          <ImgDivideBox>
            <ImgUpload>
              <Close>x</Close>
              <Img src="/taewan.jpg" />
            </ImgUpload>
            <ImgUpload style={{ backgroundColor: "#bdbdbd" }}>
              <span>x</span>
              <span>Upload</span>
            </ImgUpload>
          </ImgDivideBox>
        </ImgUploadBox>
        <InputBox>
          <Label>메인 사진 설정</Label>
          <RadioBox>
            <label>
              <InputRadio name="pic" type="radio" />
              <RadioSpan>사진1</RadioSpan>
            </label>
            <label>
              <InputRadio name="pic" type="radio" />
              <RadioSpan>사진2</RadioSpan>
            </label>
          </RadioBox>
        </InputBox>
        <BtnBox>
          <Btn>상품등록하기</Btn>
          <Btn>취소</Btn>
        </BtnBox>
      </Wrapper>
    </>
  );
}
