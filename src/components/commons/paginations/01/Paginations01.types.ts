import { type ApolloQueryResult } from "@apollo/client";
import { type MouseEvent } from "react";
import {
  type IQuery,
  type IQueryFetchBoardsArgs,
} from "../../../../commons/types/generated/types";

export interface IPaginations01Props {
  count?: number;
  refetch: (
    variables: Partial<IQueryFetchBoardsArgs>,
  ) => Promise<ApolloQueryResult<Pick<IQuery, "fetchBoards">>>;
}

export interface IPaginations01UIProps {
  startPage: number;
  lastPage: number;
  activedPage: number;
  onClickPage: (event: MouseEvent<HTMLSpanElement>) => void;
  onClickPrevPage: () => void;
  onClickNextPage: () => void;
}
