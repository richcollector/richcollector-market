import styled from "@emotion/styled";

export const ImgBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: flex-start;

  width: 300px;
  height: 300px;
  margin-right: 24px;
`;

export const UploadImage = styled.img`
  width: 280px;
  height: 280px;

  object-fit: cover;
  border-radius: 10px;

  cursor: pointer;
`;

export const UploadButton = styled.button`
  width: 280px;
  height: 280px;

  font-size: 40px;
  border-radius: 10px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const UploadFileHidden = styled.input`
  display: none;
`;

export const CloseBtn = styled.img`
  position: absolute;
  top: 0;
  right: 0;

  cursor: pointer;
`;
