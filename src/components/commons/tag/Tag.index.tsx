import * as S from './Tag.styles';
import { type IProps } from './Tag.types';
import { type FocusEvent, type KeyboardEvent } from 'react';
import { isValidTag } from '../../units/market/write/MarketWrite.validation';

export default function Tags(props: IProps) {
	const onKeyPressEnter = (event: KeyboardEvent<HTMLInputElement>) => {
		if (event.key === 'Enter') {
			const newTags = [...props.productInfoInput.tags];
			const findTag = props.productInfoInput.tags.filter(el => el === event.currentTarget.value);

			if (findTag.length >= 1) alert('같은 태그가 있습니다.');
			newTags[props.index] = event.currentTarget.value;

			if (props.index < 4) {
				props.setProductInfoInput(prev => ({ ...prev, tags: newTags }));
				newTags[props.index + 1] = '';
			} else if (props.index >= 4) {
				props.setProductInfoInput(prev => ({ ...prev, tags: newTags }));
			}
		}
	};

	const onBlurTag = (event: FocusEvent<HTMLInputElement>) => {
		props.setErrorMessage(prev => ({ ...prev, tag: isValidTag(event.currentTarget?.value) }));
	};

	const onClickDelete = () => {
		const newTags = [...props.productInfoInput.tags];

		props.setProductInfoInput(prev => ({
			...prev,
			tags: newTags.filter(el => el !== newTags[props.index]),
		}));

		if (props.productInfoInput.tags.length === 1)
			props.setProductInfoInput(prev => ({ ...prev, tags: [''] }));
	};

	return (
		<>
			{props.tag !== '' ? (
				<S.TagsBox>
					<S.Input defaultValue={props.tag} disabled={props.tag !== ''} />
					<S.CloseImg src="/icon/close.svg" onClick={onClickDelete} />
				</S.TagsBox>
			) : (
				<S.TagsBox>
					<S.Input placeholder="태그 입력" onKeyPress={onKeyPressEnter} onBlur={onBlurTag} />
				</S.TagsBox>
			)}
		</>
	);
}
