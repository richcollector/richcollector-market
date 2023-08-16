import styled from "@emotion/styled";
import { HeartFilled } from "@ant-design/icons";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BoardCommentListUIItem from "../../comment/list/BoardCommentList";
import { gql, useQuery, useMutation } from "@apollo/client";
import {
  type IMutationUpdateUseditemArgs,
  type IMutation,
  type IMutationDeleteUseditemArgs,
  type IQuery,
  type IQueryFetchUseditemArgs,
  type IMutationToggleUseditemPickArgs,
} from "../../../../commons/types/generated/types";
import { useRouter } from "next/router";
import { Modal } from "antd";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useMutationFetchUsedItem } from "../../../commons/hooks/queries/useQueryFetchUsedItem";

const breakpoints = [768, 1024];

const [Phone, Monitor] = breakpoints;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 200px 2500px 1fr 200px;

  width: 1320px;
  height: 100%;

  margin-bottom: 50px;
  border-bottom: 1px solid #bdbdbd;

  @media screen and (max-width: ${Phone - 1}px) {
  }
  @media screen and (min-width: ${Phone}px) and (max-width: ${Monitor - 1}px) {
  }
  @media screen and (min-width: ${Monitor}) {
  }
`;

const InfoBox = styled.div`
  display: flex;
  width: 100%;
  height: 100%;

  border-bottom: 1px solid #bdbdbd;
`;

const InfoIconBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const InfoNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;

  width: 100%;

  margin-left: 20px;
`;

const EtcIconBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  gap: 10px;
  width: 100px;
`;

const IconImg = styled.img``;

const UserName = styled.span`
  font-size: 30px;
  font-weight: 600;
`;

const WriteDate = styled.span`
  font-size: 18px;
`;

const ProductBox = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  height: 100%;
`;

const ProductInfoBox = styled.div`
  display: flex;
  flex-direction: row;

  padding: 20px 0;
`;

const ProductNameBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-start;

  width: 100%;
  height: 200px;

  margin: 30px 0;
`;

const ProductNameDetail = styled.span`
  font-size: 30px;
  color: #bdbdbd;
`;

const ProductName = styled.span`
  font-size: 45px;
  font-weight: 600;
  color: #4f4f4f;
`;

const ProductPrice = styled.span`
  font-size: 60px;
  font-weight: 800;
`;

const HeartBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100px;
`;

const HeartIcon = styled(HeartFilled)`
  font-size: 50px;
  color: red;

  cursor: pointer;
`;

const HeartVal = styled.span`
  font-size: 40px;
`;

const ProductCarousellBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 1320px;
  height: 1800px;

  margin: 30px 0;
`;

const Carousell = styled.div`
  width: 100%;
  height: 100%;
`;

const SliderItem = styled.img`
  width: 1320px;
  height: 1320px;
  object-fit: cover;
  margin: auto;
`;

const ProductImages = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  height: 400px;
`;

const ImageBox = styled.img`
  width: 250px;
  height: 250px;
`;

const ProductContentBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
  height: 100%;

  border-bottom: 1px solid #bdbdbd;
`;

const Contents = styled.span`
  font-size: 40px;
`;

const HashBox = styled.div`
  margin: 30px 0;
`;

const Hash = styled.span`
  margin-right: 20px;
  font-size: 30px;
  color: #bdbdbd;
`;

const LocationBox = styled.div`
  display: flex;

  width: 100%;
  height: 1000px;

  margin-top: 50px;
`;

const BtnBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;

  width: 100%;
  height: 100%;
`;

const ListBtn = styled.button`
  width: 300px;
  height: 100px;
  border: none;

  background-color: #bdbdbd;
  font-size: 30px;
  cursor: pointer;
`;

const PurchaseBtn = styled.button`
  width: 300px;
  height: 100px;
  border: none;

  color: white;
  background-color: #2f4e7c;

  font-size: 30px;
  cursor: pointer;
`;
const DeleteBtn = styled.button`
  width: 300px;
  height: 100px;
  border: none;

  color: white;
  background-color: #2f4e7c;

  font-size: 30px;
  cursor: pointer;
`;

const UpdateBtn = styled.button`
  width: 300px;
  height: 100px;
  border: none;

  color: white;
  background-color: #2f4e7c;

  font-size: 30px;
  cursor: pointer;
`;
declare const window: typeof globalThis & {
  kakao: any;
};

const DELETE_USED_ITEM = gql`
  mutation deleteUseditem($useditemId: ID!) {
    deleteUseditem(useditemId: $useditemId)
  }
`;

const UPDATE_USED_ITEM = gql`
  mutation updateUseditem(
    $updateUseditemInput: UpdateUseditemInput!
    $useditemId: ID!
  ) {
    updateUseditem(
      updateUseditemInput: $updateUseditemInput
      useditemId: $useditemId
    ) {
      name
    }
  }
`;

const TOGGLE_USED_ITEM_PICK = gql`
  mutation toggleUseditemPick($useditemId: ID!) {
    toggleUseditemPick(useditemId: $useditemId)
  }
`;

export default function MarketDetail(): JSX.Element {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const router = useRouter();
  console.log(router.query.board_id);

  const { data } = useMutationFetchUsedItem({
    useditemId: String(router.query.board_id),
  });
  console.log(data?.fetchUseditem);

  const [deleteUsedItem] = useMutation<
    Pick<IMutation, "deleteUseditem">,
    IMutationDeleteUseditemArgs
  >(DELETE_USED_ITEM);

  const [updateUsedItem] = useMutation<
    Pick<IMutation, "updateUseditem">,
    IMutationUpdateUseditemArgs
  >(UPDATE_USED_ITEM);

  const onClickDelete = async () => {
    try {
      const result = await deleteUsedItem({
        variables: { useditemId: String(router.query.board_id) },
      });
      console.log(result);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const [usedItemPick] = useMutation<
    Pick<IMutation, "toggleUseditemPick">,
    IMutationToggleUseditemPickArgs
  >(TOGGLE_USED_ITEM_PICK);

  const onClickPick = async () => {
    try {
      const result = await usedItemPick({
        variables: { useditemId: String(router.query.board_id) },
      });
      console.log("result::", result);
    } catch (error) {
      if (error instanceof Error) Modal.error({ content: error.message });
    }
  };

  const onClickUpdate = (useditemId: string) => () => {
    void router.push(`/market/${useditemId}/edit`);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT}`;
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(
            data?.fetchUseditem.useditemAddress?.lat ?? 37.4485371374725,
            data?.fetchUseditem.useditemAddress?.lng ?? 127.055036215823,
          ), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          data?.fetchUseditem.useditemAddress?.lat ?? 37.4485371374725,
          data?.fetchUseditem.useditemAddress?.lng ?? 127.055036215823,
        );
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }, [data?.fetchUseditem]);

  return (
    <>
      <Wrapper>
        <InfoBox>
          <InfoIconBox>
            <IconImg src="/icon/User.svg" />
          </InfoIconBox>
          <InfoNameBox>
            <UserName>{data?.fetchUseditem.seller?.name}</UserName>
            <WriteDate>Date: {data?.fetchUseditem.createdAt}</WriteDate>
          </InfoNameBox>
          <EtcIconBox>
            <IconImg src="/icon/link.svg" />
            <IconImg src="/icon/location.svg" />
          </EtcIconBox>
        </InfoBox>
        <ProductBox>
          <ProductInfoBox>
            <ProductNameBox>
              <ProductNameDetail>
                {data?.fetchUseditem.remarks}
              </ProductNameDetail>
              <ProductName>{data?.fetchUseditem.name}</ProductName>
              <ProductPrice>{data?.fetchUseditem.price ?? 0}원</ProductPrice>
            </ProductNameBox>
            <HeartBox>
              <HeartIcon onClick={onClickPick} />
              <HeartVal>{data?.fetchUseditem.pickedCount ?? 0}</HeartVal>
            </HeartBox>
          </ProductInfoBox>
          <ProductCarousellBox>
            <Carousell>
              <Slider {...settings}>
                <div>
                  <SliderItem
                    src={`http://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
                    onError={(e) => {
                      e.currentTarget.src = "/no_image.png";
                    }}
                  />
                </div>
                <div>
                  <SliderItem
                    src={`http://storage.googleapis.com/${data?.fetchUseditem.images?.[1]}`}
                    onError={(e) => {
                      e.currentTarget.src = "/no_image.png";
                    }}
                  />
                </div>
              </Slider>
            </Carousell>
            <ProductImages>
              <ImageBox
                src={`http://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/no_image.png";
                }}
              />
              <ImageBox
                src={`http://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/no_image.png";
                }}
              />
              <ImageBox
                src={`http://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/no_image.png";
                }}
              />
              <ImageBox
                src={`http://storage.googleapis.com/${data?.fetchUseditem.images?.[0]}`}
                onError={(e) => {
                  e.currentTarget.src = "/no_image.png";
                }}
              />
            </ProductImages>
          </ProductCarousellBox>
          <ProductContentBox>
            <Contents
              dangerouslySetInnerHTML={{
                __html: `${data?.fetchUseditem.contents}`,
              }}
            />
            <HashBox>
              {data?.fetchUseditem.tags?.map((el) => (
                <Hash key={uuidv4()}>#{el}</Hash>
              ))}
            </HashBox>
          </ProductContentBox>
        </ProductBox>
        <LocationBox id="map" />
        <BtnBox>
          <Link href={"/"}>
            <ListBtn>목록으로</ListBtn>
          </Link>
          <PurchaseBtn>구매하기</PurchaseBtn>
          <DeleteBtn onClick={onClickDelete}>삭제하기</DeleteBtn>
          <UpdateBtn onClick={onClickUpdate(String(data?.fetchUseditem._id))}>
            수정하기
          </UpdateBtn>
        </BtnBox>
      </Wrapper>
      <BoardCommentListUIItem />
    </>
  );
}
