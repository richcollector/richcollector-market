import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useCreateUpdateUsedItem } from '../../../commons/hooks/customs/useCreateUpdateUsedItem';
import { useAuthCheck } from '../../../commons/hooks/customs/useAuthCheck';
import { useWriteKakaoMapPage } from '../../../commons/hooks/map/useKakaoMap';
import { WriteQuill } from '../../../commons/quill/quill.index';
import {
	isValidContents,
	isValidImage,
	isValidName,
	isValidPrice,
	isValidRemarks,
	isValidTag,
} from './MarketWrite.validation';
import SearchAddress from '../../../commons/address/SearchAddress';
import Link from 'next/link';
import Uploads from '../../../commons/uploads/Uploads.index';
import Tags from '../../../commons/tag/Tag.index';
import * as S from './MarketWrite.styles';

export default function MarketWrite() {
	useAuthCheck();

	const [errorMessage, setErrorMessage] = useState({
		name: false,
		remarks: false,
		contents: false,
		price: false,
		tag: false,
		image: false,
	});

	const {
		productInfoInput,
		sellerLocationInput,
		fileUrls,
		update,
		setFileUrls,
		onChangeInput,
		onClickSubmit,
		setProductInfoInput,
		setSellerLocationInput,
	} = useCreateUpdateUsedItem();

	useWriteKakaoMapPage({ sellerLocationInput });

	return (
		<>
			<S.Wrapper>
				<S.TitleBox>
					<h2>{update ? '상품 수정하기' : '상품 등록하기'}</h2>
				</S.TitleBox>
				<S.InputBox>
					<S.Label>상품명</S.Label>
					<S.Input
						id="name"
						placeholder="상품명을 입력해주세요."
						value={productInfoInput.name}
						onChange={onChangeInput}
						onBlur={() => {
							setErrorMessage(prev => ({ ...prev, name: isValidName(productInfoInput.name) }));
						}}
					/>
					<S.ErrorBox>{errorMessage.name && '상품명을 입력해주세요.'}</S.ErrorBox>
				</S.InputBox>
				<S.InputBox>
					<S.Label>한줄요약</S.Label>
					<S.Input
						id="remarks"
						placeholder="상품을 간단히 표현해주세요."
						value={productInfoInput.remarks}
						onChange={onChangeInput}
						onBlur={() => {
							setErrorMessage(prev => ({
								...prev,
								remarks: isValidRemarks(productInfoInput.remarks),
							}));
						}}
					/>
					<S.ErrorBox>{errorMessage.remarks && '한줄요약을 입력해주세요.'}</S.ErrorBox>
				</S.InputBox>
				<S.ExplainBox>
					<S.Label placeholder="상품을 설명해주세요.">상품설명</S.Label>
					<WriteQuill
						contents={productInfoInput.contents}
						setProductInfoInput={setProductInfoInput}
						setErrorMessage={setErrorMessage}
					/>
					<S.ErrorBox>{errorMessage.contents && '상품 설명을 입력해주세요.'}</S.ErrorBox>
				</S.ExplainBox>
				<S.InputBox>
					<S.Label>판매가격</S.Label>
					<S.Input
						id="price"
						placeholder="상품의 판매가격을 입력해주세요."
						value={productInfoInput.price}
						onChange={onChangeInput}
						onBlur={() => {
							setErrorMessage(prev => ({
								...prev,
								price: isValidPrice(productInfoInput.price),
							}));
						}}
					/>
					<S.ErrorBox>{errorMessage.price && '상품 가격을 입력해주세요.'}</S.ErrorBox>
				</S.InputBox>
				<S.InputBox>
					<S.Label>태그입력</S.Label>
					<S.TagsBox>
						{productInfoInput.tags.map((el, index) => (
							<Tags
								key={uuidv4()}
								tag={el}
								index={index}
								productInfoInput={productInfoInput}
								setProductInfoInput={setProductInfoInput}
								setErrorMessage={setErrorMessage}
							/>
						))}
					</S.TagsBox>
					<S.ErrorBox>{errorMessage.tag && '태그를 입력해주세요.'}</S.ErrorBox>
				</S.InputBox>
				<S.LocationBox>
					<S.AreaBox>
						<S.Label>거래위치</S.Label>
						<S.Area id="map" />
					</S.AreaBox>
					<S.DivideBox>
						<S.GpsBox>
							<S.Label>GPS</S.Label>
							<S.InputMap
								id="lat"
								disabled={true}
								placeholder="위도(LAT)"
								value={sellerLocationInput.lat === 0 ? '' : sellerLocationInput.lat}
								onChange={onChangeInput}
							/>
							<S.IconImg src="/icon/location.svg" />
							<S.InputMap
								id="lng"
								disabled={true}
								placeholder="경도(LNG)"
								value={sellerLocationInput.lng === 0 ? '' : sellerLocationInput.lng}
								onChange={onChangeInput}
							/>
						</S.GpsBox>
						<S.AdressBox>
							<S.Label>
								주소 <SearchAddress setSellerLocationInput={setSellerLocationInput} />
							</S.Label>

							<S.AddressInput>
								<S.Input
									id="address"
									disabled={true}
									placeholder="주소"
									value={sellerLocationInput.address}
									onChange={onChangeInput}
								/>
								<S.Input
									id="addressDetail"
									disabled={true}
									placeholder="상세주소"
									value={sellerLocationInput.addressDetail}
									onChange={onChangeInput}
								/>
							</S.AddressInput>
						</S.AdressBox>
					</S.DivideBox>
				</S.LocationBox>
				<S.ImgUploadBox>
					<S.Label>사진첨부 (3장)</S.Label>
					<S.ImgDivideBox>
						{fileUrls.map((el, index) => (
							<Uploads
								key={uuidv4()}
								index={index}
								fileUrl={el}
								fileUrls={fileUrls}
								setFileUrls={setFileUrls}
								productInfoInput={productInfoInput}
								setProductInfoInput={setProductInfoInput}
								setErrorMessage={setErrorMessage}
							/>
						))}
					</S.ImgDivideBox>
					<S.ErrorBox>{errorMessage.image && '이미지를 입력해주세요'}</S.ErrorBox>
				</S.ImgUploadBox>
				<S.BtnBox>
					<S.Btn
						onClick={onClickSubmit}
						disabled={
							isValidName(productInfoInput.name) ||
							isValidContents(productInfoInput.contents) ||
							isValidRemarks(productInfoInput.remarks) ||
							isValidPrice(productInfoInput.price) ||
							isValidTag(productInfoInput.tags[0]) ||
							isValidImage(fileUrls[0])
						}
						style={{
							backgroundColor:
								!isValidName(productInfoInput.name) &&
								!isValidContents(productInfoInput.contents) &&
								!isValidRemarks(productInfoInput.remarks) &&
								!isValidPrice(productInfoInput.price) &&
								!isValidTag(productInfoInput.tags[0]) &&
								!isValidImage(fileUrls[0])
									? 'yellow'
									: '',
						}}
					>
						{update ? '상품수정하기' : '상품등록하기'}
					</S.Btn>
					<Link href={'/'}>
						<S.Btn>취소</S.Btn>
					</Link>
				</S.BtnBox>
			</S.Wrapper>
		</>
	);
}
