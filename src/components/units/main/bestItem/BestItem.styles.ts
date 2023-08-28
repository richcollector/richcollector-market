import styled from '@emotion/styled';
import { HeartFilled } from '@ant-design/icons';
import { Phone, Monitor } from '../../../../commons/styles/globalStyles';

export const Wrapper = styled.div`
	display: grid;
	width: 100%;
	max-width: 1320px;
	border-radius: 10px;
	grid-template-columns: repeat(4, 1fr);
	grid-template-rows: 400px;
	grid-gap: 20px;
	padding: 5px;
	margin-bottom: 10px;

	@media screen and (max-width: ${Phone - 1}px) {
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		grid-template-columns: repeat(2, 1fr);
		grid-template-rows: 400px;
	}
`;

export const TitleBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	max-width: 1320px;
	height: 50px;

	margin: 10px;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 768px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
	}
`;

export const Title = styled.span`
	font-size: 2rem;
	font-weight: 800;
`;

export const Item = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	height: 100%;

	border: 1px solid #bdbdbd;
	border-radius: 10px;
	padding: 10px;

	cursor: pointer;

	:hover {
		background-color: #f0f0f0;
	}

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 768px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 200px;
	}
`;

export const ImageBox = styled.div`
	display: flex;
	width: 100%;
	height: calc(100% - 100px);
`;

export const Image = styled.img`
	width: 100%;
	height: 100%;

	object-fit: cover;
	border-radius: 10px;
`;

export const TextWrapper = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: 100%;
`;

export const TextBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	width: calc(100% - 30px);
	height: 100px;

	border-radius: 10px;
`;

export const TextTitle = styled.p`
	width: 200px;
	height: 25px;
	font-size: 20px;
	color: black;
	font-weight: 600;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
`;

export const TextContents = styled.p`
	width: 200px;
	font-size: 18px;
	color: #4f4f4f;
	font-weight: 600;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
`;

export const TextPrice = styled.p`
	font-size: 18px;
	color: black;
	font-weight: 800;
`;

export const HeartBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;

	width: 30px;
`;

export const Heart = styled(HeartFilled)`
	font-size: 20px;
	color: red;
	margin: 0px 10px;

	cursor: pointer;
`;

export const HeartNum = styled.span`
	font-size: 14px;
`;
