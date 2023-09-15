import styled from '@emotion/styled';
import { HeartFilled } from '@ant-design/icons';

export const Container = styled.div`
	display: inline-block;
	position: absolute;
	left: 20px;

	width: 200px;
	height: 400px;
	padding-left: 10px;

	z-index: 99;
	@media screen and (max-width: 1320px) {
		display: none;
	}
`;

export const Wrapper = styled.div`
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: 50px 1fr;
	grid-gap: 10px;
	position: sticky;
	top: 20px;

	width: 200px;
	height: 400px;

	border: 1px solid #bdbdbd;
	border-radius: 10px;

	padding: 10px;
	background-color: white;
`;

export const FloatingTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	height: 100%;

	font-size: 20px;
	font-weight: 800;
`;

export const ItemWrapper = styled.div`
	display: flex;
	flex-direction: row;
`;

export const HeartBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: flex-end;
	justify-content: center;
`;

export const Heart = styled(HeartFilled)`
	font-size: 20px;
	color: red;
	margin: 0px 10px;

	cursor: pointer;
`;

export const HeartNum = styled.span`
	font-size: 15px;
`;

export const ItemName = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
`;

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	border: 1px solid #bdbdbd;
	padding: 10px;

	cursor: pointer;

	:hover {
		background-color: #f0f0f0;
	}
`;

export const Image = styled.img`
	width: 100%;
	height: 150px;
	object-fit: cover;
	border-radius: 10px;
`;

export const ContentsBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: flex-start;
`;

export const ContentsTitle = styled.p`
	width: 100px;
	font-size: 16px;
	color: black;
	font-weight: 600;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
`;
export const ContentsEx = styled.p`
	width: 100px;
	font-size: 12px;
	color: #4f4f4f;
	font-weight: 600;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
`;
export const ContentsPrice = styled.p`
	font-size: 14px;
	color: black;
	font-weight: 800;
`;
