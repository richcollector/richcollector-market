import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import * as S from './SellITem.styles';
import { useSellItem } from '../../../commons/hooks/customs/useSellItem';

export default function SellItem(): JSX.Element {
	const [menu, setMenu] = useState(false);
	const { data, handleScroll, onChangeSearch, onClickMoved, onClickRegister } = useSellItem({
		menu,
	});

	return (
		<>
			<S.SellTitleBox>
				<S.SellTitle>
					<S.TitleText
						style={menu ? {} : S.activeStyle}
						onClick={() => {
							setMenu(false);
						}}
					>
						판매중상품
					</S.TitleText>
					<S.TitleText
						style={menu ? S.activeStyle : {}}
						onClick={() => {
							setMenu(true);
						}}
					>
						판매된상품
					</S.TitleText>
				</S.SellTitle>
				<S.SellSearch>
					<S.Searchbar>
						<S.Search />
						<S.SearchbarInput onChange={onChangeSearch} placeholder="검색어를 입력해 주세요." />
					</S.Searchbar>
				</S.SellSearch>
			</S.SellTitleBox>

			<S.Wrapper onScroll={handleScroll}>
				{data?.fetchUseditems.map(el => (
					<S.ItemBox onClick={onClickMoved(el._id)} key={uuidv4()}>
						<S.ImageBox>
							<S.Image
								src={
									el.images?.[0]?.includes('codecamp-file-storage')
										? `http://storage.googleapis.com/${el.images?.[0]}`
										: '/no_image.png'
								}
							/>
						</S.ImageBox>
						<S.ContentsBox>
							<S.ContentsTitle>{el.name}</S.ContentsTitle>

							<S.ContentsEx>{el.remarks}</S.ContentsEx>

							<S.ContentsHash>
								{el.tags?.map(tag => <S.Tag key={uuidv4()}>{tag}</S.Tag>)}
							</S.ContentsHash>

							<S.IconBox>
								<S.UserImg src="/icon/User.svg" />
								<S.IconText>{el.seller?.name}</S.IconText>
								<S.Heart />
								<S.IconText>{el.pickedCount}</S.IconText>
							</S.IconBox>
						</S.ContentsBox>
						<S.PriceBox>
							<h2>{el.price}원</h2>
						</S.PriceBox>
					</S.ItemBox>
				))}
			</S.Wrapper>

			<S.ButtonBox>
				<S.ItemBtn onClick={onClickRegister}>상품등록하기</S.ItemBtn>
			</S.ButtonBox>
		</>
	);
}
