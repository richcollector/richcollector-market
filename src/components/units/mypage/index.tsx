import Info from './info/Info.index';
import InfoHeader from './infoHeader/Header.index';
import MyItemPage from './myItem/MyItem.index';
import MyPointPage from './myPoint/MyPoint.index';
import Myprofile from './myProfile/MyProfile.index';
import * as S from './index.styles';
import { useState } from 'react';
import { useAuthComponent } from '../../commons/hooks/customs/useAuthCheck';

function My() {
	const [bigMenu, setBigMenu] = useState('1');

	return (
		<>
			<S.Wrapper>
				<InfoHeader bigMenu={bigMenu} setBigMenu={setBigMenu} />
				<S.BlankBox>
					<Info bigMenu={bigMenu} setBigMenu={setBigMenu}></Info>
				</S.BlankBox>
				{bigMenu === '1' && <MyItemPage bigMenu={bigMenu} />}
				{bigMenu === '2' && <MyPointPage bigMenu={bigMenu} />}
				{bigMenu === '3' && <Myprofile />}
			</S.Wrapper>
		</>
	);
}

export default useAuthComponent(My);
