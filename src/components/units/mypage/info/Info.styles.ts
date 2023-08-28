import styled from '@emotion/styled';

export const FloatingMenuBox = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 70px 200px 1fr;
	position: absolute;

	left: -240px;
	width: 200px;
	height: 1000px;

	border-right: 1px solid #bdbdbd;
`;

export const FloatingMenuTitle = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	font-size: 30px;
	font-weight: 600;
`;

export const UserInfoBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 200px;

	margin-top: 30px;
`;

export const MenuImage = styled.img`
	width: 100px;
	height: 100px;

	object-fit: cover;

	border-radius: 50%;
`;

export const UserName = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	font-size: 20px;
	font-weight: 600;
`;

export const Money = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: 100%;
	height: 100%;

	font-size: 20px;
	font-weight: 600;
	gap: 10px;
`;

export const MenuBox = styled.div`
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-top: 100px;
`;

export const Menu = styled.div`
	width: 100%;
	height: 50px;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	font-size: 20px;
	font-weight: 600;
	gap: 10px;

	cursor: pointer;

	color: #bdbdbd;

	:hover {
		color: #000000;
		font-weight: 800;
	}
`;
export const activeStyle = {
	color: '#000000',
	fontWeight: 800,
};

export const IconImg = styled.img``;
