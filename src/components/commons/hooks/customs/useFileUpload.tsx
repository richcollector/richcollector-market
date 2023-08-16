import { checkValidationImage } from "../../uploads/Uploads.validation";
import type { MutableRefObject, ChangeEvent } from "react";
import type { IUploadsProps } from "../../uploads/Uploads.types";

interface IProps {
  fileRef: MutableRefObject<HTMLInputElement | null>;
  props: IUploadsProps;
}

export function useFileUpload(props: IProps) {
  const onClickUpload = (): void => {
    props.fileRef.current?.click();
  };

  const onChangeFileUrls = (fileUrl: string, index: number) => {
    const newFileUrls = [...props.props.fileUrls];
    newFileUrls[index] = fileUrl;
    if (index < 2) newFileUrls[index + 1] = "";
    props.props.setFileUrls(newFileUrls);
  };

  const onChangeFile = (event: ChangeEvent<HTMLInputElement>) => {
    const isValid = checkValidationImage(event.target.files?.[0]);
    if (!isValid) return;

    if (event.target.files?.[0] === undefined) return;
    const result = URL.createObjectURL(event.target.files?.[0]);
    onChangeFileUrls(result, props.props.index);

    props.props.setValue("image", result);
    void props.props.trigger("image");

    const newFiles = [...props.props.files];
    if (event.target.files?.[0] === undefined) return;
    newFiles[props.props.index] = event.target.files?.[0];
    props.props.setFiles(newFiles);
    console.log("fie::", JSON.stringify(event.target.files?.[0]));
  };
  return { onClickUpload, onChangeFile };
}
