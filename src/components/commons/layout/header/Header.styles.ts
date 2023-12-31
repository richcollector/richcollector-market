import styled from '@emotion/styled';
import { Phone } from '../../../../commons/styles/globalStyles';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: flex-start;

	box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.2);
	background: #2f4e7c;
`;

export const Header = styled.div`
	height: 70px;
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	max-width: 1320px;

	padding: 0 10px;
`;

export const HeaderTextBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	width: 100%;
	@media screen and (max-width: ${Phone - 1}px) {
		justify-content: center;
	}
`;

export const HeaderText = styled.div`
	font-size: 20px;
	color: #ececec;
	padding: 0 10px;

	cursor: pointer;
`;
