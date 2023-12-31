import { useRef } from 'react';
import type { IUploadsProps } from './Uploads.types';
import { UploadButton, UploadFileHidden, UploadImage, CloseBtn, ImgBox } from './Uploads.styles';
import { useFileUpload } from '../hooks/customs/useFileUpload';

export default function Uploads(props: IUploadsProps) {
	const fileRef = useRef<HTMLInputElement | null>(null);

	const { onClickUpload, onChangeFile } = useFileUpload({
		fileRef,
		props,
	});

	const onClickDeleteUrl = () => {
		const deleteUrl = [...props.fileUrls];
		props.setFileUrls(props.fileUrls.filter(el => el !== deleteUrl[props.index]));
		if (props.fileUrls.length === 1) props.setFileUrls(['']);

		const deleteFile = [...props.productInfoInput.files];
		props.setProductInfoInput(prev => ({
			...prev,
			files: props.productInfoInput.files.filter(el => el !== deleteFile[props.index]),
		}));

		if (props.productInfoInput.files.length === 1)
			props.setProductInfoInput(prev => ({
				...prev,
				files: [],
			}));
	};

	return (
		<>
			{props.fileUrl !== '' ? (
				<ImgBox>
					<UploadImage onClick={onClickUpload} src={`${props.fileUrl}`} />
					<CloseBtn src="/icon/close.svg" onClick={onClickDeleteUrl} />
				</ImgBox>
			) : (
				<ImgBox>
					<UploadButton onClick={onClickUpload}>
						<>+</>
						<>Upload</>
					</UploadButton>
				</ImgBox>
			)}
			<UploadFileHidden type="file" ref={fileRef} onChange={onChangeFile} />
		</>
	);
}
