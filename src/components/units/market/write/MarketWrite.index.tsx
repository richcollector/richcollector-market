import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import * as S from './MarketWrite.styles';
import SearchAddress from '../../../commons/address/SearchAddress';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './MarketWrite.validation';
import Link from 'next/link';
import 'react-quill/dist/quill.snow.css';
import Uploads from '../../../commons/uploads/Uploads.index';
import Tags from '../../../commons/tag/Tag.index';
import { v4 as uuidv4 } from 'uuid';
import { useCreateUsedItem } from '../../../commons/hooks/customs/useCreateUsedItem';
import { useRouter } from 'next/router';
import { useAuthCheck } from '../../../commons/hooks/customs/useAuthCheck';
import { useWriteKakaoMapPage } from '../../../commons/hooks/map/useKakaoMap';

const ReactQuill = dynamic(async () => await import('react-quill'), {
	ssr: false,
});

export default function MarketWrite() {
	useAuthCheck();

	const [input, setInput] = useState({
		address: '',
		addressDetail: '',
		lat: 0,
		lng: 0,
	});
	useWriteKakaoMapPage({ input });

	const [tags, setTags] = useState(['']);
	const [update, setUpdate] = useState(false);
	const router = useRouter();

	const { handleSubmit, register, setValue, trigger, formState, setError } = useForm({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const {
		data,
		files,
		setFiles,
		fileUrls,
		setFileUrls,
		onChangeAddress,
		onChangeContents,
		onClickSubmit,
	} = useCreateUsedItem({ setValue, trigger, setInput, input, tags });

	useEffect(() => {
		if (router.asPath.includes('/edit')) {
			setUpdate(true);
			if (data?.fetchUseditem.name) {
				setValue('name', String(data?.fetchUseditem.name));
			}

			if (data?.fetchUseditem.remarks) {
				setValue('remarks', String(data?.fetchUseditem.remarks));
			}

			if (data?.fetchUseditem.contents) {
				setValue('contents', String(data?.fetchUseditem.contents));
			}

			if (data?.fetchUseditem.price) {
				setValue('price', Number(data?.fetchUseditem.price));
			}

			if (data?.fetchUseditem.tags) {
				setTags(prev => (data?.fetchUseditem.tags ? [...data?.fetchUseditem.tags] : [...prev]));
				setValue('tags', String(data?.fetchUseditem.tags));
			}

			setInput(prev => ({
				...prev,
				address: data?.fetchUseditem.useditemAddress?.address ?? '',
				addressDetail: data?.fetchUseditem.useditemAddress?.addressDetail ?? '',
				lat: Number(data?.fetchUseditem.useditemAddress?.lat ?? null),
				lng: Number(data?.fetchUseditem.useditemAddress?.lng ?? null),
			}));
		}
	}, []);

	return (
		<>
			<S.Wrapper>
				<S.TitleBox>
					<h2>{update ? '상품 수정하기' : '상품 등록하기'}</h2>
				</S.TitleBox>
				<S.InputBox>
					<S.Label>상품명</S.Label>
					<S.Input placeholder="상품명을 입력해주세요." {...register('name')} />
					<S.ErrorBox>{formState.errors.name}</S.ErrorBox>
				</S.InputBox>
				<S.InputBox>
					<S.Label>한줄요약</S.Label>
					<S.Input placeholder="상품을 간단히 표현해주세요." {...register('remarks')} />
					<S.ErrorBox>{formState.errors.remarks?.message}</S.ErrorBox>
				</S.InputBox>
				<S.ExplainBox>
					<S.Label placeholder="상품을 설명해주세요.">상품설명</S.Label>
					<ReactQuill
						onChange={onChangeContents}
						placeholder="상품을 자세히 설명해주세요."
						style={{ height: '850px', fontSize: '20px' }}
					/>
					<S.ErrorBox>{formState.errors.contents?.message}</S.ErrorBox>
				</S.ExplainBox>
				<S.InputBox>
					<S.Label>판매가격</S.Label>
					<S.Input placeholder="상품의 판매가격을 입력해주세요." {...register('price')} />
					<S.ErrorBox>{formState.errors.price?.message}</S.ErrorBox>
				</S.InputBox>
				<S.InputBox>
					<S.Label>태그입력</S.Label>
					<S.TagsBox>
						{tags.map((el, index) => (
							<Tags
								key={uuidv4()}
								tag={el}
								index={index}
								register={register('tags')}
								tags={tags}
								setTags={setTags}
								trigger={trigger}
								setValue={setValue}
								setError={setError}
							/>
						))}
					</S.TagsBox>
					<S.ErrorBox>{formState.errors.tags?.message}</S.ErrorBox>
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
								disabled={true}
								placeholder="위도(LAT)"
								value={input.lat === 0 ? '' : input.lat}
								onChange={onChangeAddress}
							/>
							<S.IconImg src="/icon/location.svg" />
							<S.InputMap
								disabled={true}
								placeholder="경도(LNG)"
								value={input.lng === 0 ? '' : input.lng}
								onChange={onChangeAddress}
							/>
						</S.GpsBox>
						<S.AdressBox>
							<S.Label>
								주소 <SearchAddress setInput={setInput} />
							</S.Label>

							<S.AddressInput>
								<S.Input
									disabled={true}
									placeholder="주소"
									value={input.address}
									onChange={onChangeAddress}
								/>
								<S.Input
									disabled={true}
									placeholder="상세주소"
									value={input.addressDetail}
									onChange={onChangeAddress}
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
								files={files}
								setFiles={setFiles}
								register={register('image')}
								trigger={trigger}
								setValue={setValue}
							/>
						))}
					</S.ImgDivideBox>
					<S.ErrorBox>{formState.errors.image?.message}</S.ErrorBox>
				</S.ImgUploadBox>
				<S.BtnBox>
					<S.Btn
						onClick={handleSubmit(onClickSubmit)}
						disabled={!formState.isValid}
						style={{ backgroundColor: formState.isValid ? 'yellow' : '' }}
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
