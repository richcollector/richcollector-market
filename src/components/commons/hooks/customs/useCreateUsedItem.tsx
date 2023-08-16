import {
  type ChangeEvent,
  useState,
  type Dispatch,
  type SetStateAction,
  type MouseEvent,
} from "react";
import { useMutationUploadFile } from "../mutation/useMutationUploadFile";
import { Modal } from "antd";
import type { UseFormTrigger, UseFormSetValue } from "react-hook-form";
import { useMutationCreateUsedItem } from "../mutation/useMutationCreateUsedItem";
import { useRouter } from "next/router";
import { useMutationUpdateUsedItem } from "../mutation/useMutaionUpdateUsedItem";
import { useMutationFetchUsedItem } from "../queries/useQueryFetchUsedItem";

interface IFormData {
  name: string;
  remarks: string;
  contents: string;
  price: number;
  tags: string;
  image: string;
  address?: string;
  addressDetail?: string;
  lat?: number;
  lng?: number;
}

interface IProps {
  setValue: UseFormSetValue<{
    name: string;
    remarks: string;
    contents: string;
    price: number;
    tags: string;
    image: string;
    address: string | undefined;
    addressDetail: string | undefined;
    lat: number | undefined;
    lng: number | undefined;
  }>;
  trigger: UseFormTrigger<{
    name: string;
    remarks: string;
    contents: string;
    price: number;
    tags: string;
    image: string;
    address: string | undefined;
    addressDetail: string | undefined;
    lat: number | undefined;
    lng: number | undefined;
  }>;
  setInput: Dispatch<
    SetStateAction<{
      address: string;
      addressDetail: string;
      lat: number;
      lng: number;
    }>
  >;
  input: {
    address: string;
    addressDetail: string;
    lat: number;
    lng: number;
  };
  tags: string[];
}

export function useCreateUsedItem(props: IProps) {
  const [fileUrls, setFileUrls] = useState([""]);
  const [fileRealUrls, setFileRealUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile] = useMutationUploadFile();
  const [createUsedItem] = useMutationCreateUsedItem();
  const [updateUsedITem] = useMutationUpdateUsedItem();
  const router = useRouter();

  const { data } = useMutationFetchUsedItem({
    useditemId: String(router.query.board_id),
  });

  const onClickSubmit = async (data: IFormData) => {
    const newFileRealUrls = [...fileRealUrls];
    // 파일 업로드
    for (let i = 0; i < files.length; i++) {
      console.log(...fileRealUrls);
      try {
        const result = await uploadFile({ variables: { file: files[i] } });
        if (result.data?.uploadFile.url)
          newFileRealUrls[i] = result.data?.uploadFile.url;
        console.log(
          "result.data?.uploadFile.url::",
          result.data?.uploadFile.url,
        );
        console.log("newFileRealUrls::", newFileRealUrls);
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }

    if (!router.asPath.includes("/edit")) {
      console.log("data::", data);
      //게시글 작성
      try {
        const result = await createUsedItem({
          variables: {
            createUseditemInput: {
              name: data.name,
              remarks: data.remarks,
              contents: data.contents,
              price: data.price,
              tags: props.tags.filter((el) => el !== ""),
              useditemAddress: {
                address: props.input.address,
                addressDetail: props.input.addressDetail,
                lat: parseFloat(String(props.input.lat)),
                lng: parseFloat(String(props.input.lng)),
              },
              images: newFileRealUrls.filter((el) => el !== ""),
            },
          },
        });
        void router.push("/");
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    } else if (router.asPath.includes("/edit")) {
      try {
        const result = await updateUsedITem({
          variables: {
            updateUseditemInput: {
              name: data.name,
              remarks: data.remarks,
              contents: data.contents,
              price: data.price,
              tags: props.tags.filter((el) => el !== ""),
              useditemAddress: {
                address: props.input.address,
                addressDetail: props.input.addressDetail,
                lat: parseFloat(String(props.input.lat)),
                lng: parseFloat(String(props.input.lng)),
              },
              images: newFileRealUrls.filter((el) => el !== ""),
            },
            useditemId: String(router.query.board_id),
          },
        });
        void router.push("/");
      } catch (error) {
        if (error instanceof Error) Modal.error({ content: error.message });
      }
    }
  };

  const onChangeContents = (value: string) => {
    props.setValue("contents", value === "<p><br></p>" ? "" : value);

    void props.trigger("contents");
  };

  const onChangeAddress = (event: ChangeEvent<HTMLInputElement>) => {
    const { type, value } = event.target;
    props.setInput((prev) => ({ ...prev, [type]: value }));
  };
  return {
    data,
    fileUrls,
    setFileUrls,
    files,
    setFiles,
    onClickSubmit,
    onChangeContents,
    onChangeAddress,
  };
}
