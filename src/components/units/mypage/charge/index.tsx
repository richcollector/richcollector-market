import React, { useState } from "react";
import { Modal } from "antd";
import styled from "@emotion/styled";

const ChargeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 20px;
`;
const Select = styled.select`
  width: 100%;
  border: none;
  border-bottom: 3px solid #bdbdbd;
  padding-bottom: 10px;

  font-size: 20px;
`;

const Option = styled.option``;

const ModalBtn = styled.button`
  width: 140px;
  height: 30px;
  border: none;
  border-radius: 10px;

  font-size: 15px;

  background-color: #ffd600;
`;

const Btn = styled.button`
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 10px;
  border: none;

  cursor: pointer;
`;

export default function ChargeModal(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  return (
    <>
      <ModalBtn onClick={showModal}>포인트 충전하기</ModalBtn>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <ChargeBox>
          <img src="/icon/charge.svg" />
          <h2>충전하실 금액을 선택해주세요!</h2>
          <Select>
            <Option defaultChecked disabled>
              포인트 선택
            </Option>
            <Option>100</Option>
            <Option>500</Option>
            <Option>1,000</Option>
            <Option>3,000</Option>
            <Option>5,000</Option>
          </Select>
          <Btn>충전하기</Btn>
        </ChargeBox>
      </Modal>
    </>
  );
}
