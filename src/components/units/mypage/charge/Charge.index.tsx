import React, { type ChangeEvent, useState } from 'react';
import { Modal } from 'antd';
import { gql, useMutation } from '@apollo/client';
import type {
	IMutation,
	IMutationCreatePointTransactionOfLoadingArgs,
} from '../../../../commons/types/generated/types';
import { useRecoilState } from 'recoil';
import { userInfomation } from '../../../../commons/store';
import * as S from './Charge.styles';
import { useRouter } from 'next/router';

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

export default function ChargeModal() {
	const router = useRouter();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [info] = useRecoilState(userInfomation);
	const [money, setMoney] = useState(0);

	const [createPointLoading] = useMutation<
		Pick<IMutation, 'createPointTransactionOfLoading'>,
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
				pg: 'kakaopay',
				pay_method: 'card',
				name: '충전',
				amount: money,
				buyer_email: info[0].email,
				buyer_name: info[0].name,
				m_redirect_url: 'http://localhost:3000/mypage',
			},
			function (rsp: any) {
				createPointLoading({ variables: { impUid: rsp.imp_uid } })
					.then(res => {
						setIsModalOpen(false);
						router.push('/');
					})
					.catch(error => {
						console.error('error::', error);
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
			<S.ModalBtn onClick={showModal}>포인트 충전하기</S.ModalBtn>
			<Modal open={isModalOpen} onCancel={handleCancel} footer={null}>
				<S.ChargeBox>
					<img src="/icon/charge.svg" />
					<h2>충전하실 금액을 선택해주세요!</h2>
					<S.Select defaultValue="포인트 선택" onChange={onChangeMoney}>
						<S.Option disabled>포인트 선택</S.Option>
						<S.Option>100</S.Option>
						<S.Option>500</S.Option>
					</S.Select>
					<S.Btn onClick={onClickPayment}>충전하기</S.Btn>
				</S.ChargeBox>
			</Modal>
		</>
	);
}
