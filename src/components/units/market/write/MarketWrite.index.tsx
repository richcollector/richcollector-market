import { type ChangeEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import * as S from "./MarketWrite.styles";
import SearchAddress from "../../../commons/address/SearchAddress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./MarketWrite.validation";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

interface UseditemAddressInput {
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  lat?: number;
  lng?: number;
}

interface IFormData {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string;
  // images: string;
  // useditemAddress?: UseditemAddressInput;
  zipcode?: string;
  address?: string;
  addressDetail?: string;
  lat?: number;
  lng?: number;
}

declare const window: typeof globalThis & {
  kakao: any;
};

export default function MarketWrite() {
  const [input, setInput] = useState({
    address: "",
    addressDetail: "",
    lat: null,
    lng: null,
  });

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=9c57afbf9b5e6dec0c9339b7158113b4";
    document.head.appendChild(script);
    script.onload = () => {
      window.kakao.maps.load(function () {
        const container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
        const options = {
          //지도를 생성할 때 필요한 기본 옵션
          center: new window.kakao.maps.LatLng(
            input.lng === null ? 37.4485371374725 : input.lng,
            input.lat === null ? 127.055036215823 : input.lat,
          ), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          input.lng === null ? 37.4485371374725 : input.lng,
          input.lat === null ? 127.055036215823 : input.lat,
        );
        // 마커를 생성합니다
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
        });
        // 마커가 지도 위에 표시되도록 설정합니다
        marker.setMap(map);
      });
    };
  }, [input.lat]);

  const { handleSubmit, register, setValue, trigger, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  });
  const onClickSubmit = (data: IFormData) => {
    console.log("data::", data);
  };
  const onChangeContents = (value: string): void => {
    setValue("contents", value === "<p><br></p>" ? "" : value);

    void trigger("contents");
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target;
    setInput((prev) => ({ ...prev, [type]: value }));
  };

  return (
    <>
      <S.Wrapper>
        <S.TitleBox>
          <h2>상품 등록하기</h2>
        </S.TitleBox>
        <S.InputBox>
          <S.Label>상품명</S.Label>
          <S.Input placeholder="상품명을 입력해주세요." {...register("name")} />
        </S.InputBox>
        <S.InputBox>
          <S.Label>한줄요약</S.Label>
          <S.Input
            placeholder="상품을 간단히 표현해주세요."
            {...register("remarks")}
          />
        </S.InputBox>
        <S.ExplainBox>
          <S.Label placeholder="상품을 설명해주세요.">상품설명</S.Label>
          <ReactQuill onChange={onChangeContents} style={{ height: "850px" }} />
        </S.ExplainBox>
        <S.InputBox>
          <S.Label>판매가격</S.Label>
          <S.Input
            placeholder="상품의 판매가격을 입력해주세요."
            {...register("price")}
          />
        </S.InputBox>
        <S.InputBox>
          <S.Label>태그입력</S.Label>
          <S.Input
            placeholder="상품의 태그를 입력해주세요."
            {...register("tags")}
          />
        </S.InputBox>
        <S.LocationBox>
          <S.AreaBox>
            <S.Label>거래위치</S.Label>
            <S.Area id="map" style={{ width: 450, height: 350 }} />
          </S.AreaBox>
          <S.DivideBox>
            <S.GpsBox>
              <S.Label>GPS</S.Label>
              <S.InputMap
                disabled={true}
                placeholder="위도(LAT)"
                value={input.lat}
                onChange={onChangeAddress}
              />
              <S.IconImg src="/icon/location.svg" />
              <S.InputMap
                disabled={true}
                placeholder="경도(LNG)"
                value={input.lng}
                onChange={onChangeAddress}
              />
            </S.GpsBox>
            <S.AdressBox>
              <S.Label>
                주소 <SearchAddress setInput={setInput} />
              </S.Label>

              <S.AddressInput>
                <S.Input
                  disabled={true}
                  placeholder="주소"
                  value={input.address}
                  onChange={onChangeAddress}
                />
                <S.Input
                  disabled={true}
                  placeholder="상세주소"
                  value={input.addressDetail}
                  onChange={onChangeAddress}
                />
              </S.AddressInput>
            </S.AdressBox>
          </S.DivideBox>
        </S.LocationBox>
        <S.ImgUploadBox>
          <S.Label>사진첨부</S.Label>
          <S.ImgDivideBox>
            <S.ImgUpload>
              <S.Close>x</S.Close>
              <S.Img src="/taewan.jpg" />
            </S.ImgUpload>
            <S.ImgUpload style={{ backgroundColor: "#bdbdbd" }}>
              <span>x</span>
              <span>Upload</span>
            </S.ImgUpload>
          </S.ImgDivideBox>
        </S.ImgUploadBox>
        <S.InputBox>
          <S.Label>메인 사진 설정</S.Label>
          <S.RadioBox>
            <label>
              <S.InputRadio name="pic" type="radio" />
              <S.RadioSpan>사진1</S.RadioSpan>
            </label>
            <label>
              <S.InputRadio name="pic" type="radio" />
              <S.RadioSpan>사진2</S.RadioSpan>
            </label>
          </S.RadioBox>
        </S.InputBox>
        <S.BtnBox>
          <S.Btn
            onClick={handleSubmit(onClickSubmit)}
            style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
          >
            상품등록하기
          </S.Btn>
          <Link href={"/"}>
            <S.Btn>취소</S.Btn>
          </Link>
        </S.BtnBox>
      </S.Wrapper>
    </>
  );
}
