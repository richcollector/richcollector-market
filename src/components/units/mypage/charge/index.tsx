import React, { type ChangeEvent, useState } from "react";
import { Modal } from "antd";
import styled from "@emotion/styled";
import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationCreatePointTransactionOfLoadingArgs,
} from "../../../../commons/types/generated/types";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";

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

const CREATE_POINT_LOADING = gql`
  mutation createPointTransactionOfLoading($impUid: ID!) {
    createPointTransactionOfLoading(impUid: $impUid) {
      _id
      amount
    }
  }
`;

declare const window: typeof globalThis & {
  IMP: any;
};

export default function ChargeModal(): JSX.Element {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [info, setInfo] = useRecoilState(userInfomation);
  const [money, setMoney] = useState(0);

  const [createPointLoading] = useMutation<
    Pick<IMutation, "createPointTransactionOfLoading">,
    IMutationCreatePointTransactionOfLoadingArgs
  >(CREATE_POINT_LOADING);

  const showModal = (): void => {
    setIsModalOpen(true);
  };

  const handleCancel = (): void => {
    setIsModalOpen(false);
  };

  const onClickPayment = () => {
    const IMP = window.IMP;
    IMP.init(`${process.env.NEXT_PUBLIC_IMP}`);

    IMP.request_pay(
      {
        pg: "kakaopay",
        pay_method: "card",
        // merchant_uid: "ORD20180131-0000011",
        name: "포인트 충전",
        amount: 100, // 숫자 타입
        buyer_email: info[0].email,
        buyer_name: info[0].name,
        m_redirect_url: "http://localhost:3000/mypage",
      },
      function (rsp: any) {
        // callback
        console.log("rsp::", rsp);
        console.log("rsp::", rsp.imp_uid);

        // createPointTransactionOfLoading
        createPointLoading({ variables: { impUid: rsp.imp_uid } })
          .then((res) => {
            console.log("res::", res);
            setIsModalOpen(false);
          })
          .catch((e) => {
            console.log("e::", e);
          });
      },
    );
  };

  const onChangeMoney = (event: ChangeEvent<HTMLSelectElement>) => {
    setMoney(Number(event.currentTarget.value));
  };

  return (
    <>
      <script src="https://cdn.iamport.kr/v1/iamport.js"></script>
      <ModalBtn onClick={showModal}>포인트 충전하기</ModalBtn>
      <Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
        <ChargeBox>
          <img src="/icon/charge.svg" />
          <h2>충전하실 금액을 선택해주세요!</h2>
          <Select defaultValue="포인트 선택" onChange={onChangeMoney}>
            <Option disabled>포인트 선택</Option>
            <Option>100</Option>
            <Option>500</Option>
            <Option>1,000</Option>
            <Option>3,000</Option>
            <Option>5,000</Option>
          </Select>
          <Btn onClick={onClickPayment}>충전하기</Btn>
        </ChargeBox>
      </Modal>
    </>
  );
}
