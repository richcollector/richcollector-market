import { Modal } from 'antd';
import type { IFormData } from '../../../units/sign/login/Login.types';
import { useMutationLoginUser } from '../mutation/useMutationLoginUser';
import { useRouter } from 'next/router';
import { accessTokenState } from '../../../../commons/store';
import { useRecoilState } from 'recoil';

export const useLogin = () => {
	const router = useRouter();
	const [, setAccessToken] = useRecoilState(accessTokenState);
	const [loginUser] = useMutationLoginUser();

	const onClickSubmit = async (data: IFormData) => {
		try {
			const result = await loginUser({
				variables: {
					email: data.email,
					password: data.password,
				},
			});
			setAccessToken(result.data?.loginUser.accessToken ?? '');
			void router.push('/');
		} catch (error) {
			if (error instanceof Error) {
				Modal.error({
					title: 'This is an error message',
					content: error.message,
				});
			}
		}
	};
	return {
		onClickSubmit,
	};
};
