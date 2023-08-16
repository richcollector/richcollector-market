import { type Dispatch, type SetStateAction } from "react";
import {
  type UseFormTrigger,
  type UseFormRegisterReturn,
  type UseFormSetValue,
} from "react-hook-form";

export interface IProps {
  register: UseFormRegisterReturn;
  tags: string[];
  tag: string;
  index: number;
  setTags: Dispatch<SetStateAction<string[]>>;
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
}
