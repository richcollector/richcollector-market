import { Modal } from 'antd';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useRecoilValueLoadable } from 'recoil';
import { restoreAccessTokenLoadable } from '../../../../commons/store';

export const useAuthComponent = (Component: any) => (props: any) => {
	const router = useRouter();
	const auth = useRecoilValueLoadable(restoreAccessTokenLoadable);

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const accessToken = await auth.toPromise();
				if (!accessToken) {
					Modal.warning({
						title: 'This is a warning message',
						content: '로그인을 하셔야 이용하실 수 있습니다.',
					});
					router.push('/login');
				}
			} catch (error) {
				console.error('Error checking auth:', error);
			}
		};

		checkAuth();
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

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const accessToken = await auth.toPromise();
				if (!accessToken) {
					Modal.warning({
						title: 'This is a warning message',
						content: '로그인을 하셔야 이용하실 수 있습니다.',
					});
					router.push('/login');
				}
			} catch (error) {
				console.error('Error checking auth:', error);
			}
		};

		checkAuth();
	}, []);
}
