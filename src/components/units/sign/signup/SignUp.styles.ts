import styled from '@emotion/styled';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 100dvw;
	height: 100dvh;
	background-color: rgb(47, 78, 124, 0.2);
`;

export const SignBox = styled.div`
	display: flex;
	position: absolute;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;
	width: 440px;
	height: 600px;
	border: 1px solid #bdbdbd;
	background-color: white;
	border-radius: 10px;
	padding: 20px;
`;

export const SignUpTitleBox = styled.div`
	text-align: center;
`;

export const InputBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;

	height: 110px;
`;

export const Label = styled.div`
	font-size: 15px;
`;

export const InputCommon = styled.input`
	width: 384px;
	height: 40px;
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
	width: 384px;
	height: 50px;

	font-size: 20px;

	background-color: #bdbdbd;
	border: none;
	cursor: pointer;

	:hover {
		background-color: #2f4e7c;
	}
`;

export const TextLink = styled.a`
	text-decoration: none;
	cursor: pointer;
`;

export const XIcon = styled.img`
	font-size: 30px;
	position: absolute;
	top: 10px;
	right: 10px;
`;
