import styled from '@emotion/styled';
import { Phone, Monitor } from '../../../../commons/styles/globalStyles';

export const BoardBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;

	width: 100%;
	height: 1000px;
`;

export const BoardMenu = styled.div`
	display: flex;
	width: 100%;
	height: 80px;
`;

export const Boardcontents = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: flex-start;

	width: 100%;
`;

export const MenuTitleBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
	width: 100%;
	height: 100%;
`;

export const MenuTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	font-size: 20px;
	font-weight: 600;
	cursor: pointer;

	:hover {
		font-weight: 800;
		border-bottom: 4px solid orange;
	}
`;

export const LineBox = styled.div`
	display: flex;
	height: 20px;
	border: 1px solid #bdbdbd;
	margin: 0 20px;
`;

export const activeStyle = {
	fontWeight: 800,
	borderBottom: '4px solid orange',
};

export const SignBox = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	width: 1320px;

	height: 900px;
	border: 1px solid #bdbdbd;
	background-color: white;
	border-radius: 10px;
	padding: 20px;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 500px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 767px;
	}
`;

export const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;

	width: 100%;
	height: 400px;
`;

export const InputCommon = styled.input`
	width: 100%;
	height: 50px;
	padding: 10px;

	font-size: 18px;

	border-radius: 5px;
	border: 1px solid #bdbdbd;
`;

export const ErrorCommon = styled.div`
	width: 384px;
	height: 20px;
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-start;

	color: red;
`;

export const SignBtn = styled.button`
	width: 380px;
	height: 50px;

	font-size: 20px;

	background-color: #bdbdbd;
	border: none;
	cursor: pointer;
`;

export const LoginBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;

	height: 100px;
	border-radius: 16px;
`;

export const Label = styled.div`
	font-size: 20px;
`;

export const ImgBox = styled.div`
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: flex-end;
	align-items: flex-start;

	width: 400px;
	height: 400px;
	margin: 0 auto;
`;

export const UploadImage = styled.img`
	width: 380px;
	height: 380px;

	object-fit: cover;
	border-radius: 10px;

	cursor: pointer;
`;

export const UploadButton = styled.button`
	width: 380px;
	height: 380px;

	font-size: 40px;
	border-radius: 10px;
	background-color: #bdbdbd;
	margin-right: 24px;
	outline: none;
	border: none;
	cursor: pointer;
`;

export const UploadFileHidden = styled.input`
	display: none;
`;

export const CloseBtn = styled.img`
	position: absolute;
	top: 0;
	right: 0;

	cursor: pointer;
`;
