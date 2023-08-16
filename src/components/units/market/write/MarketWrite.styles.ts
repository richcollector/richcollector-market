import styled from "@emotion/styled";

export const breakpoints = [768, 1024];

export const [Phone, Monitor] = breakpoints;

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 90px 150px 150px 1000px 150px 150px 450px 400px 90px;

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

export const TitleBox = styled.div`
  text-align: center;
`;

export const InputBox = styled.div``;

export const ExplainBox = styled.div`
  height: 100%;
`;

export const Label = styled.div`
  font-size: 20px;
  font-weight: 600;

  margin: 10px 0;
`;

export const Input = styled.input`
  height: 50px;
  width: 100%;

  padding-left: 10px;

  font-size: 20px;
`;

export const LocationBox = styled.div`
  display: grid;
  grid-template-columns: 500px auto;
`;

export const ImgUploadBox = styled.div`
  display: grid;
  grid-template-rows: 50px 300px;
`;

export const ImgUpload = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  width: 300px;
  height: 300px;

  font-size: 20px;
  margin-right: 20px;
`;

export const InputRadio = styled.input`
  margin-right: 10px;
`;

export const AreaBox = styled.div``;
export const Area = styled.div`
  height: 350px;
  width: 450px;
`;

export const GpsBox = styled.div`
  height: 150px;
`;

export const AdressBox = styled.div`
  height: 150px;
`;

export const DivideBox = styled.div``;

export const IconImg = styled.img`
  margin: 0 10px;
`;

export const InputMap = styled.input`
  width: 200px;
  height: 50px;

  font-size: 20px;

  padding-left: 15px;
`;

export const AddressInput = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const RadioBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: first baseline;
  align-items: center;
`;

export const RadioSpan = styled.span`
  font-size: 20px;
  margin-right: 10px;
`;

export const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Btn = styled.button`
  width: 200px;
  height: 50px;

  font-size: 20px;

  cursor: pointer;
`;

export const Close = styled.div`
  position: absolute;
  font-size: 30px;

  top: 10px;
  right: 10px;

  cursor: pointer;
`;

export const ImgDivideBox = styled.div`
  display: flex;
`;

export const Img = styled.img`
  width: 100%;
  height: 100%;

  object-fit: cover;
`;

export const TagsBox = styled.div`
  display: flex;
`;
