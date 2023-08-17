import { type ChangeEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import * as S from "./MarketWrite.styles";
import SearchAddress from "../../../commons/address/SearchAddress";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./MarketWrite.validation";
import Link from "next/link";
import "react-quill/dist/quill.snow.css";
import Uploads from "../../../commons/uploads/Uploads.index";
import Tags from "../../../commons/tag/Tag.index";
import { v4 as uuidv4 } from "uuid";
import { useCreateUsedItem } from "../../../commons/hooks/customs/useCreateUsedItem";
import { useRouter } from "next/router";

const ReactQuill = dynamic(async () => await import("react-quill"), {
  ssr: false,
});

declare const window: typeof globalThis & {
  kakao: any;
};

export default function MarketWrite() {
  const [input, setInput] = useState({
    address: "",
    addressDetail: "",
    lat: 0,
    lng: 0,
  });
  const [tags, setTags] = useState([""]);
  const [update, setUpdate] = useState(false);
  const router = useRouter();

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
            input.lat === 0 ? 37.4485371374725 : input.lat,
            input.lng === 0 ? 127.055036215823 : input.lng,
          ), //지도의 중심좌표.
          level: 3, //지도의 레벨(확대, 축소 정도)
        };

        const map = new window.kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
        // 마커가 표시될 위치입니다
        const markerPosition = new window.kakao.maps.LatLng(
          input.lat === 0 ? 37.4485371374725 : input.lat,
          input.lng === 0 ? 127.055036215823 : input.lng,
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

  const {
    data,
    files,
    setFiles,
    fileUrls,
    setFileUrls,
    onChangeAddress,
    onChangeContents,
    onClickSubmit,
  } = useCreateUsedItem({ setValue, trigger, setInput, input, tags });

  useEffect(() => {
    if (router.asPath.includes("/edit")) {
      setUpdate(true);
      if (data?.fetchUseditem.name) {
        setValue("name", String(data?.fetchUseditem.name));
        trigger("name");
      }

      if (data?.fetchUseditem.remarks) {
        setValue("remarks", String(data?.fetchUseditem.remarks));
        trigger("remarks");
      }

      if (data?.fetchUseditem.contents) {
        setValue("contents", String(data?.fetchUseditem.contents));
        trigger("contents");
      }

      if (data?.fetchUseditem.price) {
        setValue("price", Number(data?.fetchUseditem.price));
        trigger("price");
      }

      if (data?.fetchUseditem.tags) {
        setTags((prev) =>
          data?.fetchUseditem.tags ? [...data?.fetchUseditem.tags] : [...prev],
        );
        setValue("tags", String(data?.fetchUseditem.tags));
        trigger("tags");
      }

      setInput((prev) => ({
        ...prev,
        address: data?.fetchUseditem.useditemAddress?.address ?? "",
        addressDetail: data?.fetchUseditem.useditemAddress?.addressDetail ?? "",
        lat: Number(data?.fetchUseditem.useditemAddress?.lat ?? null),
        lng: Number(data?.fetchUseditem.useditemAddress?.lng ?? null),
      }));
    }
  }, []);

  return (
    <>
      <S.Wrapper>
        <S.TitleBox>
          <h2>{update ? "상품 수정하기" : "상품 등록하기"}</h2>
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
          <ReactQuill
            onChange={onChangeContents}
            placeholder="상품을 자세히 설명해주세요."
            style={{ height: "850px", fontSize: "20px" }}
          />
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
          <S.TagsBox>
            {tags.map((el, index) => (
              <>
                <Tags
                  tag={el}
                  index={index}
                  register={register("tags")}
                  tags={tags}
                  setTags={setTags}
                  trigger={trigger}
                  setValue={setValue}
                />
              </>
            ))}
          </S.TagsBox>
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
                value={input.lat === 0 ? "" : input.lat}
                onChange={onChangeAddress}
              />
              <S.IconImg src="/icon/location.svg" />
              <S.InputMap
                disabled={true}
                placeholder="경도(LNG)"
                value={input.lng === 0 ? "" : input.lng}
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
          <S.Label>사진첨부 (3장)</S.Label>
          <S.ImgDivideBox>
            {fileUrls.map((el, index) => (
              <Uploads
                key={uuidv4()}
                index={index}
                fileUrl={el}
                fileUrls={fileUrls}
                setFileUrls={setFileUrls}
                files={files}
                setFiles={setFiles}
                register={register("image")}
                trigger={trigger}
                setValue={setValue}
              />
            ))}
          </S.ImgDivideBox>
        </S.ImgUploadBox>
        <S.BtnBox>
          <S.Btn
            onClick={handleSubmit(onClickSubmit)}
            style={{ backgroundColor: formState.isValid ? "yellow" : "" }}
          >
            {update ? "상품수정하기" : "상품등록하기"}
          </S.Btn>
          <Link href={"/"}>
            <S.Btn>취소</S.Btn>
          </Link>
        </S.BtnBox>
      </S.Wrapper>
    </>
  );
}
