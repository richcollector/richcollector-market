import dynamic from 'next/dynamic';

interface IPropsWrite {
	onChangeContents: (value: string) => void;
}

const ReactQuill = dynamic(async () => await import('react-quill'), {
	ssr: false,
});

export function WriteQuill({ onChangeContents }: IPropsWrite) {
	return (
		<>
			<ReactQuill
				onChange={onChangeContents}
				placeholder="상품을 자세히 설명해주세요."
				style={{ height: '850px', fontSize: '20px' }}
			/>
		</>
	);
}
