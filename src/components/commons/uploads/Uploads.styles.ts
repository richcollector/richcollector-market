import styled from "@emotion/styled";

export const UploadImage = styled.img`
  width: 300px;
  height: 300px;
  margin-right: 24px;

  object-fit: cover;

  cursor: pointer;
`;

export const UploadButton = styled.button`
  width: 300px;
  height: 300px;
  background-color: #bdbdbd;
  margin-right: 24px;
  outline: none;
  border: none;
  cursor: pointer;
`;

export const UploadFileHidden = styled.input`
  display: none;
`;
