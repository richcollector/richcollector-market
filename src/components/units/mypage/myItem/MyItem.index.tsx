import { v4 as uuidv4 } from 'uuid';
import Paginations from '../../../commons/paginations/Paginations.index';
import Info from '../info/Info.index';
import { type ChangeEvent, useEffect, useState } from 'react';
import { getDate } from '../../../../commons/libraries/utils';
import * as S from './MyItem.styles';
import { useMuItem } from '../../../commons/hooks/customs/useMyItem';
import _ from 'lodash';

interface IProps {
	bigMenu: string;
}

export default function MyItemPage({ bigMenu }: IProps) {
	const [menu, setMenu] = useState('1');
	const [count, setCount] = useState(1);
	const { data, pickCount, pickData, refetch, pickRefetch, soldCount } = useMuItem();

	const getDebounce = _.debounce(value => {
		switch (menu) {
			case '1':
				void refetch({ search: value, page: 1 });
				return;
			case '2':
				void pickRefetch({ search: value, page: 1 });
		}
	}, 500);

	const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
		getDebounce(event.currentTarget.value);
	};

	useEffect(() => {
		if (menu === '1') {
			setCount(soldCount?.fetchUseditemsCountISold ?? 1);
		} else if (menu === '2') {
			setCount(pickCount?.fetchUseditemsCountIPicked ?? 1);
		}
	}, [soldCount, pickCount, menu]);

	return (
		<>
			<S.BoardBox>
				<S.BoardMenu>
					<S.MenuTitleBox>
						<S.MenuTitle
							style={menu === '1' ? S.activeStyle : {}}
							onClick={() => {
								setMenu('1');
							}}
						>
							나의상품
						</S.MenuTitle>
						<S.LineBox />
						<S.MenuTitle
							style={menu === '2' ? S.activeStyle : {}}
							onClick={() => {
								setMenu('2');
							}}
						>
							마이찜
						</S.MenuTitle>
					</S.MenuTitleBox>
					<S.SearchBox>
						<S.Searchbar>
							<S.Search />
							<S.SearchbarInput onChange={onChangeSearch} placeholder="검색어를 입력해 주세요." />
						</S.Searchbar>
					</S.SearchBox>
				</S.BoardMenu>
				<S.Boardcontents>
					<S.BoardColumnTitle>
						<S.ColumnTitle>번호</S.ColumnTitle>
						<S.ColumnTitle>상품명</S.ColumnTitle>
						<S.ColumnTitle>판매여부</S.ColumnTitle>
						<S.ColumnTitle>판매가격</S.ColumnTitle>
						<S.ColumnTitle>날짜</S.ColumnTitle>
					</S.BoardColumnTitle>
					{menu === '1' &&
						data?.fetchUseditemsISold.map((el, index) => (
							<S.BoardColumnContent key={uuidv4()}>
								<S.CoulumnContent>{index + 1}</S.CoulumnContent>
								<S.CoulumnContent>{el.name}</S.CoulumnContent>
								<S.CoulumnContent>{el.soldAt ? '판매완료' : '판매중'}</S.CoulumnContent>
								<S.CoulumnContent>{el.price}원</S.CoulumnContent>
								<S.CoulumnContent>{getDate(el.createdAt)}</S.CoulumnContent>
							</S.BoardColumnContent>
						))}
					{menu === '2' &&
						pickData?.fetchUseditemsIPicked.map((el, index) => (
							<S.BoardColumnContent key={uuidv4()}>
								<S.CoulumnContent>{index + 1}</S.CoulumnContent>
								<S.CoulumnContent>{el.name}</S.CoulumnContent>
								<S.CoulumnContent>{el.soldAt ? '판매완료' : '판매중'}</S.CoulumnContent>
								<S.CoulumnContent>{el.price}원</S.CoulumnContent>
								<S.CoulumnContent>{getDate(el.createdAt)}</S.CoulumnContent>
							</S.BoardColumnContent>
						))}
				</S.Boardcontents>
				<S.PaginationBox>
					<Paginations
						bigMenu={bigMenu}
						menu={menu}
						count={count}
						refetch={refetch}
						pickRefetch={pickRefetch}
					/>
				</S.PaginationBox>
			</S.BoardBox>
		</>
	);
}
