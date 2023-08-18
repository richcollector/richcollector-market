import { type Dispatch, type SetStateAction } from "react";
import type {
  UseFormTrigger,
  UseFormRegisterReturn,
  UseFormSetValue,
  UseFormSetError,
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
  setError: UseFormSetError<{
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
