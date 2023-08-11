import type { ChangeEventHandler, Dispatch, SetStateAction } from "react";

import type {
  UseFormRegisterReturn,
  UseFormTrigger,
  UseFormSetValue,
} from "react-hook-form";

export interface IUploadsProps {
  index: number;
  files: File[];
  fileUrl: string;
  fileUrls: string[];
  defaultFileUrl?: string;

  register: UseFormRegisterReturn;
  setFileUrls: Dispatch<SetStateAction<string[]>>;
  setFiles: Dispatch<SetStateAction<File[]>>;
  trigger: UseFormTrigger<{
    name: string;
    remarks: string;
    contents: string;
    price: number;
    pickedCount: string | undefined;
    tags: string;
    image: string;
    address: string | undefined;
    addressDetail: string | undefined;
    lat: number | undefined;
    lng: number | undefined;
  }>;
  setValue: UseFormSetValue<{
    name: string;
    remarks: string;
    contents: string;
    price: number;
    pickedCount: string | undefined;
    tags: string;
    image: string;
    address: string | undefined;
    addressDetail: string | undefined;
    lat: number | undefined;
    lng: number | undefined;
  }>;
}
