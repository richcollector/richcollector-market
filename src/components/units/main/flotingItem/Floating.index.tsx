import { v4 as uuidv4 } from 'uuid';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import * as S from './Floating.styles';

interface IData {
	_id: string;
	images: string[];
	name: string;
	remarks: string;
	price: number;
	pickedCount: number;
}

export default function FlotiongItem() {
	const [data, setData] = useState([]);
	const router = useRouter();

	useEffect(() => {
		const todayItem = JSON.parse(localStorage.getItem('todayItem') ?? '[]');
		setData(todayItem);
	}, []);

	const onClickMoved = (useditemId: string) => () => {
		void router.push(`/market/${useditemId}`);
	};

	return (
		<>
			{data[0] !== null && (
				<S.Container>
					<S.Wrapper>
						<S.ItemName>
							<S.FloatingTitle>방금 본 상품</S.FloatingTitle>
						</S.ItemName>
						{data?.map((el: IData) => (
							<S.Item key={uuidv4()} onClick={onClickMoved(el?._id)}>
								<S.Image
									src={
										el?.images?.[0]?.includes('codecamp-file-storage')
											? `http://storage.googleapis.com/${el.images?.[0]}`
											: '/no_image.png'
									}
								></S.Image>
								<S.ItemWrapper>
									<S.ContentsBox>
										<S.ContentsTitle>{el?.name ?? ''}</S.ContentsTitle>
										<S.ContentsEx>{el?.remarks ?? ''}</S.ContentsEx>
										<S.ContentsPrice>{el?.price ?? 0}원</S.ContentsPrice>
									</S.ContentsBox>
									<S.HeartBox>
										<S.Heart />
										<S.HeartNum>{el?.pickedCount ?? 0}</S.HeartNum>
									</S.HeartBox>
								</S.ItemWrapper>
							</S.Item>
						))}
					</S.Wrapper>
				</S.Container>
			)}
		</>
	);
}
