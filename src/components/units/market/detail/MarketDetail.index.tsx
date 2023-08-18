import * as S from "./MarketDetail.styles";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import BoardCommentListUIItem from "../../comment/list/CommentList";
import Link from "next/link";
import { v4 as uuidv4 } from "uuid";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userInfomation } from "../../../../commons/store";
import { useDetailUsedItem } from "../../../commons/hooks/customs/useDetailUsedItem";
import { Tooltip } from "antd";
import { getDate } from "../../../../commons/libraries/utils";

declare const window: typeof globalThis & {
  kakao: any;
};

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
  const [info, setInfo] = useRecoilState(userInfomation);

  const { data, onClickDelete, onClickPick, onClickUpdate } =
    useDetailUsedItem();

  useEffect(() => {
    if (data?.fetchUseditem.useditemAddress?.lat) {
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
    }
  }, [data?.fetchUseditem.useditemAddress?.lat]);

  useEffect(() => {
    const todayItem: any[] = JSON.parse(
      localStorage.getItem("toadyItem") ?? "[]",
    );
    todayItem.push(...todayItem, data?.fetchUseditem);
    localStorage.setItem("todayItem", JSON.stringify(todayItem));
  }, [data]);

  return (
    <>
      <S.Wrapper>
        <S.InfoBox>
          <S.InfoIconBox>
            <S.IconImg src="/icon/User.svg" />
          </S.InfoIconBox>
          <S.InfoNameBox>
            <S.UserName>{data?.fetchUseditem.seller?.name}</S.UserName>
            <S.WriteDate>
              Date: {getDate(data?.fetchUseditem.createdAt)}
            </S.WriteDate>
          </S.InfoNameBox>
          <S.EtcIconBox>
            {data?.fetchUseditem.useditemAddress?.address && (
              <Tooltip
                title={`${data?.fetchUseditem.useditemAddress?.address}`}
              >
                <S.IconImg src="/icon/location.svg" />
              </Tooltip>
            )}
          </S.EtcIconBox>
        </S.InfoBox>
        <S.ProductBox>
          <S.ProductInfoBox>
            <S.ProductNameBox>
              <S.ProductNameDetail>
                {data?.fetchUseditem.remarks}
              </S.ProductNameDetail>
              <S.ProductName>{data?.fetchUseditem.name}</S.ProductName>
              <S.ProductPrice>
                {data?.fetchUseditem.price ?? 0}원
              </S.ProductPrice>
            </S.ProductNameBox>
            <S.HeartBox>
              <S.HeartIcon onClick={onClickPick} />
              <S.HeartVal>{data?.fetchUseditem.pickedCount ?? 0}</S.HeartVal>
            </S.HeartBox>
          </S.ProductInfoBox>
          <S.ProductCarousellBox>
            <S.Carousell>
              <Slider {...settings}>
                {data?.fetchUseditem.images?.map((el) => (
                  <div key={uuidv4()}>
                    <S.SliderItem
                      src={
                        el.includes("codecamp-file-storage")
                          ? `http://storage.googleapis.com/${el}`
                          : "/no_image.png"
                      }
                    />
                  </div>
                ))}
              </Slider>
            </S.Carousell>
            <S.ProductImages>
              {data?.fetchUseditem.images?.map((el) => (
                <S.ImageBox
                  key={uuidv4()}
                  src={
                    el.includes("codecamp-file-storage")
                      ? `http://storage.googleapis.com/${el}`
                      : "/no_image.png"
                  }
                />
              ))}
            </S.ProductImages>
          </S.ProductCarousellBox>
          <S.ProductContentBox>
            <S.Contents
              dangerouslySetInnerHTML={{
                __html: `${data?.fetchUseditem.contents}`,
              }}
            />
            <S.HashBox>
              {data?.fetchUseditem.tags?.map((el) => (
                <S.Hash key={uuidv4()}>{el}</S.Hash>
              ))}
            </S.HashBox>
          </S.ProductContentBox>
        </S.ProductBox>
        {data?.fetchUseditem.useditemAddress?.lat && <S.LocationBox id="map" />}
        <S.BtnBox>
          <Link href={"/"}>
            <S.ListBtn>목록으로</S.ListBtn>
          </Link>
          {info === String(data?.fetchUseditem.seller?.email) || (
            <S.PurchaseBtn>구매하기</S.PurchaseBtn>
          )}
          {info === String(data?.fetchUseditem.seller?.email) && (
            <S.DeleteBtn onClick={onClickDelete}>삭제하기</S.DeleteBtn>
          )}
          {info === String(data?.fetchUseditem.seller?.email) && (
            <S.UpdateBtn
              onClick={onClickUpdate(String(data?.fetchUseditem._id))}
            >
              수정하기
            </S.UpdateBtn>
          )}
        </S.BtnBox>
      </S.Wrapper>
      <BoardCommentListUIItem
        useditemId={data?.fetchUseditem._id}
        writerId={data?.fetchUseditem.seller?.email}
      />
    </>
  );
}
