import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';
import type { Dispatch, SetStateAction } from 'react';
import { isValidContents } from '../../units/market/write/MarketWrite.validation';

interface IPropsWrite {
	contents: string;

	setProductInfoInput: Dispatch<
		SetStateAction<{
			name: string;
			remarks: string;
			contents: string;
			price: number;
			tags: string[];
			files: File[];
		}>
	>;

	setErrorMessage: Dispatch<
		SetStateAction<{
			name: boolean;
			remarks: boolean;
			contents: boolean;
			price: boolean;
			tag: boolean;
			image: boolean;
		}>
	>;
}

const ReactQuill = dynamic(async () => await import('react-quill'), {
	ssr: false,
});

export function WriteQuill({ contents, setProductInfoInput, setErrorMessage }: IPropsWrite) {
	const onChangeContents = (value: string) => {
		setProductInfoInput(prev => ({ ...prev, contents: value }));
	};
	return (
		<>
			<ReactQuill
				onChange={onChangeContents}
				value={contents}
				placeholder="상품을 자세히 설명해주세요."
				style={{ height: '850px', fontSize: '20px' }}
				onBlur={() => {
					setErrorMessage(prev => ({
						...prev,
						contents: isValidContents(contents),
					}));
				}}
			/>
		</>
	);
}
