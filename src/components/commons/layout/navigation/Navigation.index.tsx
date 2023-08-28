import { Fragment, type MouseEvent } from 'react';
import { MenuOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { useRecoilState } from 'recoil';
import { accessTokenState } from '../../../../commons/store';
import * as S from './Navigation.styles';

const NAVIGATION_MENUS = [
	{ name: '중고마켓', page: '/' },
	{ name: '마이페이지', page: '/mypage' },
];

export default function LayoutNavigation(): JSX.Element {
	const router = useRouter();
	const [accessToken, setAccessToken] = useRecoilState(accessTokenState);

	const onClickMenu = (event: MouseEvent<HTMLDivElement>): void => {
		event.preventDefault();
		void router.push(event.currentTarget.id);
	};

	const onClickRegister = (event: MouseEvent<HTMLButtonElement>): void => {
		event.preventDefault();
		void router.push(event.currentTarget.id);
	};

	return (
		<>
			<S.Wrapper>
				<S.Bar>
					<S.MainMenu>
						<S.MenuIcon>
							<MenuOutlined />
						</S.MenuIcon>
						<S.MainMenuDiv>
							<S.MainLogo href="/">
								<S.Logo src="/RichCollector.png"></S.Logo>
							</S.MainLogo>
						</S.MainMenuDiv>
						{NAVIGATION_MENUS.map(el => (
							<Fragment key={el.page}>
								<S.MenuLink id={el.page} onClick={onClickMenu}>
									{el.name}
								</S.MenuLink>
							</Fragment>
						))}
						<S.MainMenuDiv>
							<S.MainMenuBtn id={'/market/new'} onClick={onClickRegister}>
								물품등록 <S.Arrow className="Arrow" />
							</S.MainMenuBtn>
						</S.MainMenuDiv>
					</S.MainMenu>
				</S.Bar>
				<div className="writeBtn"></div>
			</S.Wrapper>
		</>
	);
}
