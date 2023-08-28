import styled from '@emotion/styled';
import { DoubleRightOutlined } from '@ant-design/icons';
import { Phone } from '../../../../commons/styles/globalStyles';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;
	border-bottom: 1px solid #bdbdbd;
	/* box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2); */
`;

export const Bar = styled.div`
	width: 100%;
	max-width: 1320px;
	height: 70px;
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const MainMenu = styled.div`
	width: 100%;
	display: flex;

	flex-direction: row;
	justify-content: space-between;
	align-items: center;
	@media screen and (max-width: ${Phone - 1}px) {
		justify-content: space-around;
	}
`;

export const MainMenuDiv = styled.div``;

export const MenuLink = styled.div`
	text-decoration: none;
	font-size: 20px;
	font-weight: 600;
	color: #111;

	border-radius: 20px;
	padding-left: 10px;
	padding: 10px;
	transition: all 0.3s ease-in-out;

	cursor: pointer;

	:hover {
		padding-left: 20px;
		background: #eeeeee;
	}

	:active {
		font-weight: 800;
		color: red;
	}

	@media screen and (max-width: ${Phone - 1}px) {
		display: none;
	}
`;

export const MainMenuBtn = styled.button`
	width: 150px;
	background: #2f4e7c;

	font-size: 20px;
	color: white;
	text-align: left;

	border-radius: 5px;
	padding: 5px 10px;
	border: 0;

	cursor: pointer;

	:hover {
		background: white;
		border: 1px solid #2f4e7c;
		color: #2f4e7c;
	}
	:hover .Arrow {
		transform: translateX(20px);
	}

	@media screen and (max-width: ${Phone - 1}px) {
		display: none;
	}
`;

export const MenuIcon = styled.div`
	display: none;
	cursor: pointer;
	@media screen and (max-width: ${Phone - 1}px) {
		display: flex;
	}
`;

export const Arrow = styled(DoubleRightOutlined)`
	display: inline-block;
	padding-left: 10px;
	transition: all 0.3s ease-in-out;
`;

export const MainLogo = styled.a`
	text-decoration: none;

	:visited {
		color: black;
	}
`;

export const Logo = styled.img`
	height: 40px;

	@media screen and (max-width: ${Phone - 1}px) {
		height: 25px;
	}
`;
