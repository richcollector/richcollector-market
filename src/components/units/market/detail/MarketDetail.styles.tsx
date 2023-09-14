import styled from '@emotion/styled';
import { HeartFilled } from '@ant-design/icons';
import { Phone, Monitor } from '../../../../commons/styles/globalStyles';

export const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;

	width: 100%;
	max-width: 1320px;

	height: 100%;

	margin-bottom: 50px;
	border-bottom: 1px solid #bdbdbd;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 768px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
	}
`;

export const InfoBox = styled.div`
	display: flex;

	width: 100%;
	height: 250px;

	padding: 50px 10px;
	border-bottom: 1px solid #bdbdbd;
`;

export const InfoIconBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 200px;
`;

export const IconImg = styled.img`
	cursor: pointer;
	border-radius: 10%;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 150px;
	}
`;

export const InfoNameBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: flex-start;

	width: 100%;

	margin-left: 20px;
`;

export const EtcIconBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;

	gap: 10px;
	width: 100px;
`;

export const UserName = styled.span`
	font-size: 30px;
	font-weight: 600;
`;

export const WriteDate = styled.span`
	font-size: 18px;
`;

export const ProductBox = styled.div`
	display: flex;
	flex-direction: column;

	width: 100%;
`;

export const ProductInfoBox = styled.div`
	display: flex;
	flex-direction: row;
	width: 100%;
	padding: 20px;
`;

export const ProductNameBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: flex-start;

	width: 100%;
	height: 200px;

	margin: 30px 0;
`;

export const ProductNameDetail = styled.span`
	font-size: 30px;
	color: #bdbdbd;
`;

export const ProductName = styled.span`
	font-size: 45px;
	font-weight: 600;
	color: #4f4f4f;
`;

export const ProductPrice = styled.span`
	font-size: 60px;
	font-weight: 800;
`;

export const HeartBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100px;
`;

export const HeartIcon = styled(HeartFilled)`
	font-size: 50px;
	color: red;

	cursor: pointer;
`;

export const HeartVal = styled.span`
	font-size: 40px;
`;

export const ProductCarousellBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: space-evenly;
	align-items: center;

	width: 100%;
	max-width: 1320px;

	height: 1800px;

	margin: 30px 0;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 768px;
		height: 800px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
	}
`;

export const Carousell = styled.div`
	width: 100%;
	max-width: 1320px;
	height: 100%;
	max-height: 1320px;
	@media screen and (max-width: ${Phone - 1}px) {
		width: 400px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 768px;
	}
`;

export const SliderItem = styled.img`
	width: 100%;
	max-width: 1320px;
	height: 100%;
	max-height: 1320px;

	object-fit: cover;
	margin: auto;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		max-width: 300px;
		height: 100%;
		max-height: 300px;
	}

	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
		height: 100%;
		min-height: 768px;
	}
`;

export const ProductImages = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;

	width: 100%;
	height: 400px;
`;

export const ImageBox = styled.img`
	width: 250px;
	height: 250px;
	object-fit: cover;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 150px;
		height: 150px;
	}
`;

export const ProductContentBox = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: center;

	width: 100%;
	height: 100%;

	border-bottom: 1px solid #bdbdbd;
`;

export const Contents = styled.span`
	font-size: 40px;
`;

export const HashBox = styled.div`
	margin: 30px 0;
`;

export const Hash = styled.span`
	margin-right: 20px;
	font-size: 30px;
	color: #bdbdbd;
`;

export const LocationBox = styled.div`
	display: flex;

	width: 100%;
	min-width: 1320px;
	height: 100%;
	min-height: 1000px;

	margin-top: 50px;

	@media screen and (max-width: ${Phone - 1}px) {
		width: 100%;
		min-width: 400px;
		height: 100%;
		min-height: 400px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 100%;
		min-width: 768px;
		height: 100%;
		min-height: 768px;
	}
`;

export const BtnBox = styled.div`
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	align-items: center;

	padding: 50px 0;

	width: 100%;
	height: 200px;
`;

export const ListBtn = styled.button`
	width: 300px;
	height: 100px;
	border: none;

	background-color: #bdbdbd;
	font-size: 30px;
	cursor: pointer;

	@media screen and (max-width: ${Phone - 1}px) {
		font-size: 20px;
		width: 150px;
		height: 50px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 200px;
		height: 100px;
	}
`;

export const PurchaseBtn = styled.button`
	width: 300px;
	height: 100px;
	border: none;

	color: white;
	background-color: #2f4e7c;

	font-size: 30px;
	cursor: pointer;

	@media screen and (max-width: ${Phone - 1}px) {
		font-size: 20px;
		width: 150px;
		height: 50px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 200px;
		height: 100px;
	}
`;
export const DeleteBtn = styled.button`
	width: 300px;
	height: 100px;
	border: none;

	color: white;
	background-color: #2f4e7c;

	font-size: 30px;
	cursor: pointer;
	@media screen and (max-width: ${Phone - 1}px) {
		font-size: 20px;
		width: 150px;
		height: 50px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 200px;
		height: 100px;
	}
`;

export const UpdateBtn = styled.button`
	width: 300px;
	height: 100px;
	border: none;

	color: white;
	background-color: #2f4e7c;

	font-size: 30px;
	cursor: pointer;

	@media screen and (max-width: ${Phone - 1}px) {
		font-size: 20px;
		width: 150px;
		height: 50px;
	}
	@media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
		width: 200px;
		height: 100px;
	}
`;
