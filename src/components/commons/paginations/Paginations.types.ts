import { type ApolloQueryResult } from '@apollo/client';
import { type MouseEvent } from 'react';
import type {
	IQueryFetchUseditemsISoldArgs,
	IQuery,
	IQueryFetchUseditemsIPickedArgs,
	IQueryFetchPointTransactionsOfSellingArgs,
	IQueryFetchPointTransactionsOfBuyingArgs,
	IQueryFetchPointTransactionsArgs,
	IQueryFetchPointTransactionsOfLoadingArgs,
} from '../../../commons/types/generated/types';

export interface IPaginationsProps {
	menu: string;
	bigMenu?: string;
	count?: number;
	refetch?: (
		variables?: Partial<IQueryFetchUseditemsISoldArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchUseditemsISold'>>>;
	pickRefetch?: (
		variables?: Partial<IQueryFetchUseditemsIPickedArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchUseditemsIPicked'>>>;
	buyingRefetch?: (
		variables?: Partial<IQueryFetchPointTransactionsOfBuyingArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchPointTransactionsOfBuying'>>>;
	sellingRefetch?: (
		variables?: Partial<IQueryFetchPointTransactionsOfSellingArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchPointTransactionsOfSelling'>>>;
	pointRefetch?: (
		variables?: Partial<IQueryFetchPointTransactionsArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchPointTransactions'>>>;
	loadingRefetch?: (
		variables?: Partial<IQueryFetchPointTransactionsOfLoadingArgs> | undefined,
	) => Promise<ApolloQueryResult<Pick<IQuery, 'fetchPointTransactionsOfLoading'>>>;
}

export interface IPaginationsUIProps {
	startPage: number;
	lastPage: number;
	activedPage: number;
	onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
	onClickPrevPage: () => void;
	onClickNextPage: () => void;
}
