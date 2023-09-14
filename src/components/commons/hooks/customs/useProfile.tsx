import { type ChangeEvent, useRef, useState } from 'react';
import { useMutationResetPassword, useMutationUodateUser } from '../mutation/useMutationMyProfile';
import { useRouter } from 'next/router';
import { useMutationUploadFile } from '../mutation/useMutationUploadFile';
import { useQueryFetchUser } from '../queries/useQueryFetchUser';
import { Modal } from 'antd';
import { checkValidationImage } from '../../uploads/Uploads.validation';
import type { UseFormSetValue, UseFormTrigger } from 'react-hook-form';

interface IProps {
	setValue: UseFormSetValue<{
		name: string;
		image: string;
	}>;
	trigger: UseFormTrigger<{
		name: string;
		image: string;
	}>;
}

export function useProfile({ setValue, trigger }: IProps) {
	const [fileUrl, setFileUrl] = useState('');
	const [file, setFile] = useState<File>();
	const fileRef = useRef<HTMLInputElement | null>(null);
	const router = useRouter();
	const [uploadFile] = useMutationUploadFile();
	const { refetch } = useQueryFetchUser();

	const [resetPassword] = useMutationResetPassword();
	const [updateUser] = useMutationUodateUser();

	const onClickSubmitPassWord = async (data: any) => {
		try {
			await resetPassword({
				variables: {
					password: data.password,
				},
			});
			refetch();
			void router.push('/');
		} catch (error) {
			if (error instanceof Error) {
				Modal.error({
					title: 'This is an error message',
					content: error.message,
				});
			}
		}
	};

	const onClickSubmitInfo = async (data: any) => {
		const fileRealiUrl = [''];

		try {
			const result = await uploadFile({ variables: { file } });
			if (result.data?.uploadFile.url) fileRealiUrl[0] = String(result.data?.uploadFile.url);
		} catch (error) {
			if (error instanceof Error) Modal.error({ content: error.message });
		}

		try {
			const result = await updateUser({
				variables: {
					updateUserInput: {
						name: data.password,
						picture: fileRealiUrl[0],
					},
				},
			});
			refetch();
			void router.push('/');
		} catch (error) {
			if (error instanceof Error) {
				Modal.error({
					title: 'This is an error message',
					content: error.message,
				});
			}
		}
	};

	const onClickUpload = () => {
		fileRef.current?.click();
	};

	const onClickDeleteUrl = () => {
		setFileUrl('');
		setFile(undefined);
	};

	const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];

		const isValid = checkValidationImage(event.target.files?.[0]);
		if (!isValid) return;

		if (file === undefined) return;
		const result = URL.createObjectURL(file);
		setFileUrl(result);

		setValue('image', result);
		void trigger('image');

		setFile(file);
	};
	return {
		fileRef,
		fileUrl,
		onClickSubmitPassWord,
		onClickSubmitInfo,
		onClickDeleteUrl,
		onClickUpload,
		onChangeFile,
	};
}
