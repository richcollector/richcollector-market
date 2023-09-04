import type { Dispatch, SetStateAction } from 'react';

export interface IUploadsProps {
	index: number;
	fileUrl: string;
	fileUrls: string[];
	setFileUrls: Dispatch<SetStateAction<string[]>>;

	productInfoInput: {
		name: string;
		remarks: string;
		contents: string;
		price: number;
		tags: string[];
		files: File[];
	};

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
