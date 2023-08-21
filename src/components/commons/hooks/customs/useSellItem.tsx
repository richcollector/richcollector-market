import { type ChangeEvent, type MouseEvent, type UIEvent } from "react";
import { useQueryFetchUsedItems } from "../queries/useQueryFetchUsedItems";
import { useRouter } from "next/router";
import _ from "lodash";

interface IProps {
  menu: boolean;
}

export function useSellItem(props: IProps) {
  const router = useRouter();

  const onClickMoved = (useditemId: string) => () => {
    void router.push(`/market/${useditemId}`);
  };

  const { data, refetch, fetchMore } = useQueryFetchUsedItems({
    isSoldout: props.menu,
    search: "",
    page: 1,
  });

  const onClickRegister = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    void router.push("/market/new");
  };

  const handleScroll = (event: UIEvent<HTMLElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log("scrollTop:", scrollTop);
    console.log("clientHeight:", clientHeight);
    console.log("scrollHeight:", scrollHeight);

    if (clientHeight + scrollTop >= scrollHeight) {
      onLoadMore();
    }
  };

  const onLoadMore = (): void => {
    if (data === undefined) return;
    void fetchMore({
      variables: {
        page: Math.ceil(data?.fetchUseditems.length ?? 10 / 10) + 1,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (fetchMoreResult.fetchUseditems === undefined)
          return { fetchUseditems: [...prev.fetchUseditems] };

        return {
          fetchUseditems: [
            ...prev.fetchUseditems,
            ...fetchMoreResult.fetchUseditems,
          ],
        };
      },
    });
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value);
  };

  return {
    onClickMoved,
    data,
    refetch,
    onClickRegister,
    handleScroll,
    onLoadMore,
    onChangeSearch,
  };
}
