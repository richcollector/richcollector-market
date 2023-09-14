import styled from '@emotion/styled';
import { HeartFilled, SearchOutlined } from '@ant-design/icons';
import { Phone, Monitor } from '../../../../commons/styles/globalStyles';

export const activeStyle = {
	fontWeight: 800,
	borderBottom: '4px solid orange',
};

export const SellTitleBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-between;
	align-items: center;

	width: 100%;
	max-width: 1320px;

	height: 100px;
	margin-bottom: 10px;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		max-width: 768px;
	}
`;

export const SellTitle = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;

	width: 100%;
`;

export const TitleText = styled.span`
	font-size: 22px;
	font-weight: 400;
	margin-left: 20px;

	cursor: pointer;

	:hover {
		font-weight: 800;
		border-bottom: 4px solid orange;
	}
`;

export const SellSearch = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-end;
	align-items: center;

	width: 100%;
`;

export const Searchbar = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;

	width: 100%;
	height: 50px;

	border-radius: 15px;
	background-color: #f5f2fc;
	padding: 0px 20px;
`;

export const Search = styled(SearchOutlined)`
	color: #5729ff;
	font-size: 30px;

	cursor: pointer;

	:hover {
		color: red;
	}
`;

export const SearchbarInput = styled.input`
	width: 100%;
	height: 100%;
	border: none;
	outline: none;
	background: none;

	font-size: 20px;

	margin: 0px 20px;
`;

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-self: flex-start;

	width: 100%;
	max-width: 1320px;
	height: 1000px;

	box-shadow: 5px 5px 5px rgba(0, 0, 0, 0.2);
	margin-bottom: 40px;
	border-top: 1px solid #bdbdbd;
	overflow-y: scroll;

	::-webkit-scrollbar {
		width: 10px;
	}
	::-webkit-scrollbar-thumb {
		height: 30%; /* 스크롤바의 길이 */
		background: #2f4e7c; /* 스크롤바의 색상 */

		border-radius: 10px;
	}
	::-webkit-scrollbar-track {
		/* background: rgba(33, 122, 244, 0.1); 스크롤바 뒷 배경 색상 */
	}

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 768px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
	}
`;

export const ItemBox = styled.div`
	display: grid;
	grid-template-columns: 1fr calc(100% - 400px) 1fr;
	grid-template-rows: 1fr;
	grid-gap: 20px;

	width: 100%;
	max-width: 1320px;
	height: 200px;
	padding: 10px 10px;
	border-bottom: 1px solid #bdbdbd;

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
		min-width: 768px;
	}
`;

export const ImageBox = styled.div`
	width: 100%;
	height: 100%;

	border-radius: 10px;
`;

export const Image = styled.img`
	width: 100%;
	height: 180px;

	object-fit: cover;
	border-radius: 10px;
`;

export const ContentsBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;

	width: 100%;
	height: 100%;
`;

export const PriceBox = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;

	width: 100%;
	height: 100%;
`;

export const Heart = styled(HeartFilled)`
	font-size: 20px;
	color: red;
	margin: 0px 10px;

	cursor: pointer;
`;

export const UserImg = styled.img`
	width: 25px;
	height: 25px;
	margin-right: 10px;
`;

export const ContentsTitle = styled.div`
	width: 800px;
	font-size: 20px;
	color: black;
	font-weight: 600;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
	}
`;
export const ContentsEx = styled.div`
	width: 800px;
	font-size: 18px;
	color: #4f4f4f;
	font-weight: 600;

	overflow: hidden;
	text-overflow: ellipsis;
	white-space: nowrap;
	word-break: break-all;
	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
	}
`;
export const ContentsHash = styled.div``;

export const Tag = styled.span`
	width: 100px;
	font: 15px;
	color: #bdbdbd;
	font-weight: 800;
	margin-right: 20px;
`;

export const IconBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: center;
`;

export const IconText = styled.div`
	font-weight: 800;
	color: #4f4f4f;
	padding: 0;
`;

export const ButtonBox = styled.div`
	width: 100%;
	max-width: 1320px;
	display: flex;
	flex-direction: row;
	justify-content: end;
	align-items: end;
	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 768px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
	}
`;

export const ItemBtn = styled.button`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	width: 150px;
	height: 60px;

	font-size: 20px;

	margin-bottom: 30px;
	border: 1px solid #bdbdbd;
	border-radius: 10px;

	cursor: pointer;
`;
