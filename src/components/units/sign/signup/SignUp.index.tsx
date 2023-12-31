import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './SignUp.validation';
import { useSignUp } from '../../../commons/hooks/customs/useSignUp';
import type { IFormData } from './SignUp.types';
import * as S from './SignUp.styles';

export default function Sign() {
	const { register, handleSubmit, formState } = useForm<IFormData>({
		resolver: yupResolver(schema),
		mode: 'onChange',
	});

	const { onClickSubmit } = useSignUp();
	return (
		<S.Wrapper>
			<S.SignBox>
				<S.SignUpTitleBox>
					<h1>회원가입</h1>
				</S.SignUpTitleBox>
				<S.InputBox>
					<S.Label>이메일</S.Label>
					<S.InputCommon type="text" placeholder="이메일을 입력해주세요." {...register('email')} />
					<S.ErrorCommon>{formState.errors.email?.message}</S.ErrorCommon>
				</S.InputBox>
				<S.InputBox>
					<S.Label>이름</S.Label>
					<S.InputCommon type="text" placeholder="이름을 입력해주세요." {...register('name')} />
					<S.ErrorCommon>{formState.errors.name?.message}</S.ErrorCommon>
				</S.InputBox>
				<S.InputBox>
					<S.Label>비밀번호</S.Label>
					<S.InputCommon
						type="password"
						placeholder="비밀번호를 입력해주세요."
						{...register('password')}
					/>
					<S.ErrorCommon>{formState.errors.password?.message}</S.ErrorCommon>
				</S.InputBox>
				<S.InputBox>
					<S.Label>비밀번호 확인</S.Label>
					<S.InputCommon
						type="password"
						placeholder="비밀번호를 다시 입력해주세요."
						{...register('passwordConfirm')}
					/>
					<S.ErrorCommon>{formState.errors.passwordConfirm?.message}</S.ErrorCommon>
				</S.InputBox>
				<S.SignBtn
					onClick={handleSubmit(onClickSubmit)}
					style={{ backgroundColor: formState.isValid ? 'yellow' : '' }}
				>
					회원가입하기
				</S.SignBtn>
				<Link href="/">
					<S.TextLink>
						<S.XIcon src="/icon/close.svg" />
					</S.TextLink>
				</Link>
			</S.SignBox>
		</S.Wrapper>
	);
}
