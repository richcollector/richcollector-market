import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { accessTokenState, restoreAccessTokenLoadable } from '../../../../commons/store';

export const useAuthComponent = (Component: any) => (props: any) => {
	const router = useRouter();
	const auth = useRecoilValueLoadable(restoreAccessTokenLoadable);
	const [accesssToken, setAccessToken] = useRecoilState(accessTokenState);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const accessToken = await auth.toPromise();
				if (!accessToken) {
					const { Modal } = await import('antd');
					Modal.warning({
						title: 'This is a warning message',
						content: '로그인을 하셔야 이용하실 수 있습니다.',
					});
					router.push('/login');
				} else if (accessToken) {
					setAccessToken(accessToken);
				}
			} catch (error) {
				console.error('Error checking auth:', error);
			}
		};

		if (!accesssToken) checkAuth();
	}, []);

	return (
		<>
			<Component {...props} />
		</>
	);
};

export function useAuthCheck() {
	const router = useRouter();
	const auth = useRecoilValueLoadable(restoreAccessTokenLoadable);
	const [accesssToken, setAccessToken] = useRecoilState(accessTokenState);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const accessToken = await auth.toPromise();
				if (!accessToken) {
					const { Modal } = await import('antd');
					Modal.warning({
						title: 'This is a warning message',
						content: '로그인을 하셔야 이용하실 수 있습니다.',
					});
					router.push('/login');
				} else if (accessToken) {
					setAccessToken(accessToken);
				}
			} catch (error) {
				console.error('Error checking auth:', error);
			}
		};
		if (!accesssToken) checkAuth();
	}, []);
}
