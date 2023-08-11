import {
  type ChangeEvent,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useMutationUploadFile } from "../mutation/useMutationUploadFile";
import { Modal } from "antd";
import type {
  UseFormRegisterReturn,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";

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
}

export function useCreateUsedItem(props: IProps) {
  const [fileUrls, setFileUrls] = useState(["", "", ""]);
  const [fileRealUrls, setFileRealUrls] = useState(["", "", ""]);
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile] = useMutationUploadFile();

  const onClickSubmit = async (data: IFormData) => {
    console.log("data::", data);

    //파일 업로드
    for (let i = 0; i < files.length; i++) {
      if (files[i]) {
        try {
          const result = await uploadFile({ variables: { file: files[i] } });
          if (result.data?.uploadFile.url) {
            const newFileUrls = [...fileUrls];
            newFileUrls[i] = result.data?.uploadFile.url;
            setFileRealUrls(newFileUrls);
            console.log(newFileUrls);
          }
        } catch (error) {
          if (error instanceof Error) Modal.error({ content: error.message });
        }
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
    fileUrls,
    setFileUrls,
    files,
    setFiles,
    onClickSubmit,
    onChangeContents,
    onChangeAddress,
  };
}
