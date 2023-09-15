import { v4 as uuidv4 } from 'uuid';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { userInfomation, accessTokenState } from '../../../../commons/store';
import { useDetailUsedItem } from '../../../commons/hooks/customs/useDetailUsedItem';
import { Tooltip } from 'antd';
import { getDate } from '../../../../commons/libraries/utils';
import { useDetailKakaoMapPage } from '../../../commons/hooks/map/useKakaoMap';
import { MySlider } from '../../../commons/slice/slice.index';
import BoardCommentListUIItem from '../../comment/list/CommentList';
import Link from 'next/link';
import * as S from './MarketDetail.styles';

export default function MarketDetail(): JSX.Element {
	const [info] = useRecoilState(userInfomation);
	const [accessToken] = useRecoilState(accessTokenState);

	const { data, onClickDelete, onClickPick, onClickUpdate, onClickBuying } = useDetailUsedItem();

	useDetailKakaoMapPage(data);

	useEffect(() => {
		const todayItem: any[] = JSON.parse(localStorage.getItem('toadyItem') ?? '[]');
		todayItem.push(...todayItem, data?.fetchUseditem);
		localStorage.setItem('todayItem', JSON.stringify(todayItem));
	}, [data]);

	return (
		<>
			<S.Wrapper>
				<S.InfoBox>
					<S.InfoIconBox>
						<S.IconImg
							src={`${
								data?.fetchUseditem.seller?.picture
									? `http://storage.googleapis.com/${data?.fetchUseditem.seller?.picture}`
									: './icon/User.svg'
							}`}
						/>
					</S.InfoIconBox>
					<S.InfoNameBox>
						<S.UserName>{data?.fetchUseditem.seller?.name}</S.UserName>
						<S.WriteDate>Date: {getDate(data?.fetchUseditem.createdAt)}</S.WriteDate>
					</S.InfoNameBox>
					<S.EtcIconBox>
						{data?.fetchUseditem.useditemAddress?.address && (
							<Tooltip title={`${data?.fetchUseditem.useditemAddress?.address}`}>
								<S.IconImg src="/icon/location.svg" />
							</Tooltip>
						)}
					</S.EtcIconBox>
				</S.InfoBox>
				<S.ProductBox>
					<S.ProductInfoBox>
						<S.ProductNameBox>
							<S.ProductNameDetail>{data?.fetchUseditem.remarks}</S.ProductNameDetail>
							<S.ProductName>{data?.fetchUseditem.name}</S.ProductName>
							<S.ProductPrice>{data?.fetchUseditem.price ?? 0}원</S.ProductPrice>
						</S.ProductNameBox>
						<S.HeartBox>
							<S.HeartIcon onClick={onClickPick} />
							<S.HeartVal>{data?.fetchUseditem.pickedCount ?? 0}</S.HeartVal>
						</S.HeartBox>
					</S.ProductInfoBox>
					<S.ProductCarousellBox>
						<S.Carousell>
							<MySlider>
								{data?.fetchUseditem.images?.map(el => (
									<div key={uuidv4()}>
										<S.SliderItem
											src={
												el.includes('codecamp-file-storage')
													? `http://storage.googleapis.com/${el}`
													: '/no_image.png'
											}
										/>
									</div>
								))}
							</MySlider>
						</S.Carousell>
						<S.ProductImages>
							{data?.fetchUseditem.images?.map(el => (
								<S.ImageBox
									key={uuidv4()}
									src={
										el.includes('codecamp-file-storage')
											? `http://storage.googleapis.com/${el}`
											: '/no_image.png'
									}
								/>
							))}
						</S.ProductImages>
					</S.ProductCarousellBox>
					<S.ProductContentBox>
						<S.Contents
							dangerouslySetInnerHTML={{
								__html: `${data?.fetchUseditem.contents}`,
							}}
						/>
						<S.HashBox>
							{data?.fetchUseditem.tags?.map(el => <S.Hash key={uuidv4()}>{el}</S.Hash>)}
						</S.HashBox>
					</S.ProductContentBox>
				</S.ProductBox>
				{data?.fetchUseditem.useditemAddress?.lat && <S.LocationBox id="map" />}
				<S.BtnBox>
					<Link href={'/'}>
						<S.ListBtn>목록으로</S.ListBtn>
					</Link>
					{info[0]?.email === String(data?.fetchUseditem.seller?.email) || !accessToken || (
						<S.PurchaseBtn onClick={onClickBuying}>구매하기</S.PurchaseBtn>
					)}
					{info[0]?.email === String(data?.fetchUseditem.seller?.email) && (
						<S.DeleteBtn onClick={onClickDelete}>삭제하기</S.DeleteBtn>
					)}
					{info[0]?.email === String(data?.fetchUseditem.seller?.email) && (
						<S.UpdateBtn onClick={onClickUpdate(String(data?.fetchUseditem._id))}>
							수정하기
						</S.UpdateBtn>
					)}
				</S.BtnBox>
			</S.Wrapper>
			<BoardCommentListUIItem
				useditemId={data?.fetchUseditem._id}
				writerId={data?.fetchUseditem.seller?.email}
			/>
		</>
	);
}
