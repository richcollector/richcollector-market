import { type Dispatch, type SetStateAction } from 'react';

export interface IProps {
	tag: string;
	index: number;

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
