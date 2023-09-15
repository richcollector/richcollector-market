import { useDaumPostcodePopup } from 'react-daum-postcode';
import type { Address } from 'react-daum-postcode';
import axios from 'axios';
import styled from '@emotion/styled';

interface IProps {
	setSellerLocationInput: React.Dispatch<
		React.SetStateAction<{
			address: string;
			addressDetail: string;
			lat: number;
			lng: number;
		}>
	>;
}

const AddressBtn = styled.button`
	width: 140px;
	height: 30px;
	border: none;
	margin-left: 10px;

	font-size: 15px;

	cursor: pointer;
	background-color: #ffd600;
`;
const scriptUrl = 'https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

// SearchAddress.js (Homne.js의 하위 컴포넌트)
export default function SearchAddress(props: IProps) {
	const open = useDaumPostcodePopup(scriptUrl);

	const handleComplete = (data: Address) => {
		const config = {
			headers: {
				Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_RESTAPI}`,
			},
		}; // 헤더 설정
		const url = `https://dapi.kakao.com/v2/local/search/address.json?query=${data.address}`; // REST API url에 data.address값 전송
		axios.get(url, config).then(function (result) {
			// API호출
			if (result.data !== undefined || result.data !== null) {
				if (result.data.documents[0].x && result.data.documents[0].y) {
					console.log('x:', result.data.documents[0].x, 'y:', result.data.documents[0].y);
					props.setSellerLocationInput({
						address: result.data.documents[0].address.address_name,
						addressDetail: result.data.documents[0].address.region_2depth_name,
						lat: result.data.documents[0].y,
						lng: result.data.documents[0].x,
					});
				}
			}
		});
	};

	const handleClick = () => {
		open({ onComplete: handleComplete });
	};

	return (
		<>
			<AddressBtn type="button" onClick={handleClick}>
				주소검색하기
			</AddressBtn>
		</>
	);
}
