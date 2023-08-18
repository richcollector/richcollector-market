import { type ApolloQueryResult } from "@apollo/client";
import { type MouseEvent } from "react";
import {
  type IQueryFetchUseditemsISoldArgs,
  type IQuery,
  type IQueryFetchBoardsArgs,
  type IQueryFetchUseditemsIPickedArgs,
} from "../../../../commons/types/generated/types";

export interface IPaginationsProps {
  menu: string;
  count?: number;
  refetch: (
    variables?: Partial<IQueryFetchUseditemsISoldArgs> | undefined,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsISold">>>;
  pickRefetch: (
    variables?: Partial<IQueryFetchUseditemsIPickedArgs> | undefined,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchUseditemsIPicked">>>;
}

export interface IPaginationsUIProps {
  startPage: number;
  lastPage: number;
  activedPage: number;
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
