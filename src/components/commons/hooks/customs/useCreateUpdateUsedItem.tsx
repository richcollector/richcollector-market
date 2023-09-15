import { type ChangeEvent, useState, useEffect } from 'react';
import { useMutationUploadFile } from '../mutation/useMutationUploadFile';
import { Modal } from 'antd';
import { useMutationCreateUsedItem } from '../mutation/useMutationCreateUsedItem';
import { useRouter } from 'next/router';
import { useMutationUpdateUsedItem } from '../mutation/useMutationUpdateUsedItem';
import { useQueryFetchUsedItem } from '../queries/useQueryFetchUsedItem';

export function useCreateUpdateUsedItem() {
	const router = useRouter();

	const { data, refetch } = useQueryFetchUsedItem({
		useditemId: String(router.query.board_id),
	});

	const [fileUrls, setFileUrls] = useState(['']);
	const [uploadFile] = useMutationUploadFile();
	const [createUsedItem] = useMutationCreateUsedItem();
	const [updateUsedITem] = useMutationUpdateUsedItem();
	const [update, setUpdate] = useState(false);

	const [productInfoInput, setProductInfoInput] = useState<{
		name: string;
		remarks: string;
		contents: string;
		price: number;
		tags: string[];
		files: File[];
	}>({
		name: '',
		remarks: '',
		contents: '',
		price: 0,
		tags: [''],
		files: [],
	});

	const [sellerLocationInput, setSellerLocationInput] = useState({
		address: '',
		addressDetail: '',
		lat: 0,
		lng: 0,
	});

	const onChangeInput = (event: ChangeEvent<HTMLInputElement>) => {
		const { id, value } = event.target;

		if (id === 'name' || id === 'remarks' || id === 'price') {
			setProductInfoInput(prev => ({ ...prev, [id]: value }));
		} else if (id === 'address' || id === 'addressDetail' || id === 'lat' || id === 'lng') {
			setSellerLocationInput(prev => ({ ...prev, [id]: value }));
		}
	};

	useEffect(() => {
		if (router.asPath.includes('/edit')) {
			setUpdate(true);
			setSellerLocationInput(prev => ({
				...prev,
				address: data?.fetchUseditem.useditemAddress?.address ?? '',
				addressDetail: data?.fetchUseditem.useditemAddress?.addressDetail ?? '',
				lat: Number(data?.fetchUseditem.useditemAddress?.lat ?? null),
				lng: Number(data?.fetchUseditem.useditemAddress?.lng ?? null),
			}));
		}
	}, []);

	const onClickSubmit = async () => {
		const newFileRealUrls: string[] = [];
		// 파일 업로드
		await Promise.all(
			productInfoInput.files.map(async (file, index) => {
				try {
					const result = await uploadFile({ variables: { file } });
					newFileRealUrls[index] = result.data?.uploadFile.url ?? '';
				} catch (error) {
					if (error instanceof Error) Modal.error({ content: error.message });
				}
			}),
		);

		if (!router.asPath.includes('/edit')) {
			//게시글 작성
			try {
				await createUsedItem({
					variables: {
						createUseditemInput: {
							name: productInfoInput.name,
							remarks: productInfoInput.remarks,
							contents: productInfoInput.contents,
							price: Number(productInfoInput.price),
							tags: productInfoInput.tags.filter(el => el !== ''),
							useditemAddress: {
								address: sellerLocationInput.address,
								addressDetail: sellerLocationInput.addressDetail,
								lat: parseFloat(String(sellerLocationInput.lat)),
								lng: parseFloat(String(sellerLocationInput.lng)),
							},
							images: newFileRealUrls.filter(el => el !== ''),
						},
					},
				});
				refetch();
				void router.push('/');
			} catch (error) {
				if (error instanceof Error) Modal.error({ content: error.message });
			}
		} else if (router.asPath.includes('/edit')) {
			try {
				await updateUsedITem({
					variables: {
						updateUseditemInput: {
							name: productInfoInput.name,
							remarks: productInfoInput.remarks,
							contents: productInfoInput.contents,
							price: Number(productInfoInput.price),
							tags: productInfoInput.tags.filter(el => el !== ''),
							useditemAddress: {
								address: sellerLocationInput.address,
								addressDetail: sellerLocationInput.addressDetail,
								lat: parseFloat(String(sellerLocationInput.lat)),
								lng: parseFloat(String(sellerLocationInput.lng)),
							},
							images: newFileRealUrls.filter(el => el !== ''),
						},
						useditemId: String(router.query.board_id),
					},
				});
				refetch();
				void router.push('/');
			} catch (error) {
				if (error instanceof Error) Modal.error({ content: error.message });
			}
		}
	};

	return {
		productInfoInput,
		sellerLocationInput,
		fileUrls,
		update,
		setFileUrls,
		onClickSubmit,
		onChangeInput,
		setProductInfoInput,
		setSellerLocationInput,
	};
}
