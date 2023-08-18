import { useState } from "react";
import type { MouseEvent } from "react";
import PaginationsUI from "./Paginations.presenter";
import type { IPaginationsProps } from "./Paginations.types";

export default function Paginations(props: IPaginationsProps): JSX.Element {
  const [startPage, setStartPage] = useState(1);
  const [activedPage, setActivedPage] = useState(1);
  const lastPage = Math.ceil((props.count ?? 10) / 10);

  const onClickPage = (event: MouseEvent<HTMLSpanElement>): void => {
    const activedPage = Number(event.currentTarget.id);
    setActivedPage(activedPage);

    switch (props.menu) {
      case "1":
        void props.refetch({ page: activedPage });
        return;
      case "2":
        void props.pickRefetch({ page: activedPage });
    }
  };

  const onClickPrevPage = (): void => {
    if (startPage === 1) return;
    setStartPage(startPage - 10);
    setActivedPage(startPage - 10);

    switch (props.menu) {
      case "1":
        void props.refetch({ page: startPage - 10 });
        return;
      case "2":
        void props.pickRefetch({ page: startPage - 10 });
    }
  };

  const onClickNextPage = (): void => {
    if (startPage + 10 <= lastPage) {
      setStartPage(startPage + 10);
      setActivedPage(startPage + 10);

      switch (props.menu) {
        case "1":
          void props.refetch({ page: startPage + 10 });
          return;
        case "2":
          void props.pickRefetch({ page: startPage + 10 });
      }
    }
  };

  return (
    <PaginationsUI
      startPage={startPage}
      lastPage={lastPage}
      activedPage={activedPage}
      onClickPage={onClickPage}
      onClickPrevPage={onClickPrevPage}
      onClickNextPage={onClickNextPage}
    />
  );
}
