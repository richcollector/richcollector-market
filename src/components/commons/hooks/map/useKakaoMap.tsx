import { useEffect } from 'react';
import type { IQuery } from '../../../../commons/types/generated/types';

declare const window: typeof globalThis & {
	kakao: any;
};

interface IPropsWrite {
	sellerLocationInput: {
		address: string;
		addressDetail: string;
		lat: number;
		lng: number;
	};
}

export function useWriteKakaoMapPage({ sellerLocationInput }: IPropsWrite) {
	useEffect(() => {
		const script = document.createElement('script');
		script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT}`;
		document.head.appendChild(script);
		script.onload = () => {
			window.kakao.maps.load(function () {
				const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
				const options = {
					//지도를 생성할 때 필요한 기본 옵션
					center: new window.kakao.maps.LatLng(
						sellerLocationInput.lat === 0 ? 37.4485371374725 : sellerLocationInput.lat,
						sellerLocationInput.lng === 0 ? 127.055036215823 : sellerLocationInput.lng,
					), //지도의 중심좌표.
					level: 3, //지도의 레벨(확대, 축소 정도)
				};

				const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
				// 마커가 표시될 위치입니다
				const markerPosition = new window.kakao.maps.LatLng(
					sellerLocationInput.lat === 0 ? 37.4485371374725 : sellerLocationInput.lat,
					sellerLocationInput.lng === 0 ? 127.055036215823 : sellerLocationInput.lng,
				);
				// 마커를 생성합니다
				const marker = new window.kakao.maps.Marker({
					position: markerPosition,
				});
				// 마커가 지도 위에 표시되도록 설정합니다
				marker.setMap(map);
			});
		};
	}, [sellerLocationInput.lat]);
}

export function useDetailKakaoMapPage(data: Pick<IQuery, 'fetchUseditem'> | undefined) {
	useEffect(() => {
		if (data?.fetchUseditem.useditemAddress?.lat) {
			const script = document.createElement('script');
			script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT}`;
			document.head.appendChild(script);
			script.onload = () => {
				window.kakao.maps.load(function () {
					const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
					const options = {
						//지도를 생성할 때 필요한 기본 옵션
						center: new window.kakao.maps.LatLng(
							data?.fetchUseditem.useditemAddress?.lat ?? 37.4485371374725,
							data?.fetchUseditem.useditemAddress?.lng ?? 127.055036215823,
						), //지도의 중심좌표.
						level: 3, //지도의 레벨(확대, 축소 정도)
					};

					const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
					// 마커가 표시될 위치입니다
					const markerPosition = new window.kakao.maps.LatLng(
						data?.fetchUseditem.useditemAddress?.lat ?? 37.4485371374725,
						data?.fetchUseditem.useditemAddress?.lng ?? 127.055036215823,
					);
					// 마커를 생성합니다
					const marker = new window.kakao.maps.Marker({
						position: markerPosition,
					});
					// 마커가 지도 위에 표시되도록 설정합니다
					marker.setMap(map);
				});
			};
		}
	}, [data?.fetchUseditem.useditemAddress?.lat]);
}
