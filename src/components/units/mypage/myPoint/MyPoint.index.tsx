import { v4 as uuidv4 } from 'uuid';
import Paginations from '../../../commons/paginations/Paginations.index';
import { type ChangeEvent, useEffect, useState } from 'react';
import { getDate } from '../../../../commons/libraries/utils';
import * as S from './MyPoint.styles';
import { useFetchPoint } from '../../../commons/hooks/customs/useFetchPoint';

interface IProps {
	bigMenu: string;
}

export default function MyPointPage({ bigMenu }: IProps) {
	const [menu, setMenu] = useState('1');
	const [count, setCount] = useState(1);
	const {
		data,
		loadingData,
		buyingData,
		sellingData,
		buyingRefetch,
		sellingRefetch,
		pointRefetch,
		loadingRefetch,
		buyingCount,
		sellingCount,
		loadingCount,
		onChangeSearch,
	} = useFetchPoint({ menu });

	useEffect(() => {
		if (menu === '1') {
			setCount(
				(loadingCount?.fetchPointTransactionsCountOfLoading ?? 0) +
					(buyingCount?.fetchPointTransactionsCountOfBuying ?? 0) +
					(sellingCount?.fetchPointTransactionsCountOfSelling ?? 0) ?? 1,
			);
		} else if (menu === '2') {
			setCount(loadingCount?.fetchPointTransactionsCountOfLoading ?? 1);
		} else if (menu === '3') {
			setCount(buyingCount?.fetchPointTransactionsCountOfBuying ?? 1);
		} else if (menu === '4') {
			setCount(sellingCount?.fetchPointTransactionsCountOfSelling ?? 1);
		}
	}, [data, loadingCount, buyingCount, sellingCount, menu]);
	console.log('data', data);

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
							전체내역
						</S.MenuTitle>
						<S.LineBox />
						<S.MenuTitle
							style={menu === '2' ? S.activeStyle : {}}
							onClick={() => {
								setMenu('2');
							}}
						>
							충전내역
						</S.MenuTitle>
						<S.LineBox />
						<S.MenuTitle
							style={menu === '3' ? S.activeStyle : {}}
							onClick={() => {
								setMenu('3');
							}}
						>
							구매내역
						</S.MenuTitle>
						<S.LineBox />
						<S.MenuTitle
							style={menu === '4' ? S.activeStyle : {}}
							onClick={() => {
								setMenu('4');
							}}
						>
							판매내역
						</S.MenuTitle>
					</S.MenuTitleBox>
					{(menu === '3' || menu === '4') && (
						<S.SearchBox>
							<S.Searchbar>
								<S.Search />
								<S.SearchbarInput onChange={onChangeSearch} placeholder="검색어를 입력해 주세요." />
							</S.Searchbar>
						</S.SearchBox>
					)}
				</S.BoardMenu>
				<S.Boardcontents>
					<S.BoardColumnTitle>
						<S.ColumnTitle>번호</S.ColumnTitle>
						<S.ColumnTitle>날짜</S.ColumnTitle>
						<S.ColumnTitle>
							{menu === '1' ? '내용' : menu === '2' ? '결제ID' : '상품명'}
						</S.ColumnTitle>
						<S.ColumnTitle>거래 및 충전 내역</S.ColumnTitle>
					</S.BoardColumnTitle>
					{menu === '1' &&
						data?.fetchPointTransactions.map((el, index) => (
							<S.BoardColumnContent key={uuidv4()}>
								<S.CoulumnContent>{index + 1}</S.CoulumnContent>
								<S.CoulumnContent>{getDate(el.createdAt)}</S.CoulumnContent>
								<S.CoulumnContent
									style={
										el.status.includes('충전') || el.status.includes('판매')
											? { color: 'blue' }
											: { color: 'red' }
									}
								>
									{el.status}
								</S.CoulumnContent>
								<S.CoulumnContent>{el.amount}</S.CoulumnContent>
							</S.BoardColumnContent>
						))}
					{menu === '2' &&
						loadingData?.fetchPointTransactionsOfLoading.map((el, index) => (
							<S.BoardColumnContent key={uuidv4()}>
								<S.CoulumnContent>{index + 1}</S.CoulumnContent>
								<S.CoulumnContent>{getDate(el.createdAt)}</S.CoulumnContent>
								<S.CoulumnContent>{el.impUid}</S.CoulumnContent>
								<S.CoulumnContent
									style={
										el.status.includes('충전') || el.status.includes('판매')
											? { color: 'blue' }
											: { color: 'red' }
									}
								>
									{el.amount}
								</S.CoulumnContent>
							</S.BoardColumnContent>
						))}
					{menu === '3' &&
						buyingData?.fetchPointTransactionsOfBuying.map(
							(el, index) =>
								el.useditem !== null && (
									<S.BoardColumnContent key={uuidv4()}>
										<S.CoulumnContent>{index + 1}</S.CoulumnContent>
										<S.CoulumnContent>{getDate(el.createdAt)}</S.CoulumnContent>
										<S.CoulumnContent>{el.useditem?.name}</S.CoulumnContent>
										<S.CoulumnContent
											style={
												el.status.includes('충전') || el.status.includes('판매')
													? { color: 'blue' }
													: { color: 'red' }
											}
										>
											{el.amount}
										</S.CoulumnContent>
									</S.BoardColumnContent>
								),
						)}
					{menu === '4' &&
						sellingData?.fetchPointTransactionsOfSelling.map(
							(el, index) =>
								el.useditem !== null && (
									<S.BoardColumnContent key={uuidv4()}>
										<S.CoulumnContent>{index + 1}</S.CoulumnContent>
										<S.CoulumnContent>{getDate(el.createdAt)}</S.CoulumnContent>
										<S.CoulumnContent>{el.useditem?.name}</S.CoulumnContent>
										<S.CoulumnContent
											style={
												el.status.includes('충전') || el.status.includes('판매')
													? { color: 'blue' }
													: { color: 'red' }
											}
										>
											{el.amount}
										</S.CoulumnContent>
									</S.BoardColumnContent>
								),
						)}
				</S.Boardcontents>
				<S.PaginationBox>
					<Paginations
						bigMenu={bigMenu}
						menu={menu}
						count={count}
						buyingRefetch={buyingRefetch}
						sellingRefetch={sellingRefetch}
						pointRefetch={pointRefetch}
						loadingRefetch={loadingRefetch}
					/>
				</S.PaginationBox>
			</S.BoardBox>
		</>
	);
}
