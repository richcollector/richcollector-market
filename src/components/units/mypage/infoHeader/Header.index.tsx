import { type Dispatch, type SetStateAction } from 'react';
import * as S from './Header.styles';

interface IProps {
	bigMenu: string;
	setBigMenu: Dispatch<SetStateAction<string>>;
}

export default function LayoutHeader({ bigMenu, setBigMenu }: IProps) {
	return (
		<>
			<S.Wrapper>
				<S.Header>
					<S.HeaderTextBox>
						<>
							<S.HeaderText
								style={bigMenu === '1' ? S.activeStyle : {}}
								onClick={() => {
									setBigMenu('1');
								}}
							>
								내 장터
							</S.HeaderText>
							<S.HeaderText
								style={bigMenu === '2' ? S.activeStyle : {}}
								onClick={() => {
									setBigMenu('2');
								}}
							>
								내 포인트
							</S.HeaderText>
							<S.HeaderText
								style={bigMenu === '3' ? S.activeStyle : {}}
								onClick={() => {
									setBigMenu('3');
								}}
							>
								내 프로필
							</S.HeaderText>
						</>
					</S.HeaderTextBox>
				</S.Header>
			</S.Wrapper>
		</>
	);
}
