import {
  useState,
  type MouseEvent,
  type ChangeEvent,
  type UIEvent,
} from "react";
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import {
  type IQuery,
  type IQueryFetchUseditemsArgs,
} from "../../../../commons/types/generated/types";
import * as S from "./SellITem.styles";
import _ from "lodash";

const FETCH_USED_ITEMS = gql`
  query fetchUseditems($isSoldout: Boolean, $search: String, $page: Int) {
    fetchUseditems(isSoldout: $isSoldout, search: $search, page: $page) {
      _id
      name
      remarks
      contents
      price
      tags
      images
      pickedCount
      seller {
        name
        picture
      }
    }
  }
`;

export default function SellItem(): JSX.Element {
  const router = useRouter();
  const [menu, setMenu] = useState(false);
  const onClickRegister = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    void router.push("/market/new");
  };
  const { data, refetch, fetchMore } = useQuery<
    Pick<IQuery, "fetchUseditems">,
    IQueryFetchUseditemsArgs
  >(FETCH_USED_ITEMS, {
    variables: {
      isSoldout: menu,
      search: "",
      page: 1,
    },
  });

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

  const onClickMoved = (useditemId: string) => () => {
    void router.push(`/market/${useditemId}`);
  };
  console.log("data::", data);

  const activeStyle = {
    fontWeight: 800,
    borderBottom: "4px solid orange",
  };

  const getDebounce = _.debounce((value) => {
    void refetch({ search: value, page: 1 });
  }, 500);

  const onChangeSearch = (event: ChangeEvent<HTMLInputElement>): void => {
    getDebounce(event.currentTarget.value);
  };

  return (
    <>
      <S.SellTitleBox>
        <S.SellTitle>
          <S.TitleText
            style={menu ? {} : activeStyle}
            onClick={() => {
              setMenu(false);
            }}
          >
            판매중상품
          </S.TitleText>
          <S.TitleText
            style={menu ? activeStyle : {}}
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
            <S.SearchbarInput
              onChange={onChangeSearch}
              placeholder="검색어를 입력해 주세요."
            />
          </S.Searchbar>
        </S.SellSearch>
      </S.SellTitleBox>

      <S.Wrapper onScroll={handleScroll}>
        {data?.fetchUseditems.map((el) => (
          <S.ItemBox onClick={onClickMoved(el._id)} key={uuidv4()}>
            <S.ImageBox>
              <S.Image
                src={
                  el.images?.[0]?.includes("codecamp-file-storage")
                    ? `http://storage.googleapis.com/${el.images?.[0]}`
                    : "/no_image.png"
                }
              />
            </S.ImageBox>
            <S.ContentsBox>
              <S.ContentsTitle>{el.name}</S.ContentsTitle>

              <S.ContentsEx>{el.remarks}</S.ContentsEx>

              <S.ContentsHash>
                {el.tags?.map((tag) => <S.Tag key={uuidv4()}>{tag}</S.Tag>)}
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
