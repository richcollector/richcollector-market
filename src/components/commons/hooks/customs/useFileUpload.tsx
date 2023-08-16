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
    console.log("fie1111::", JSON.stringify(event.target.files));
    const file = event.target.files?.[0];
    const isValid = checkValidationImage(event.target.files?.[0]);
    if (!isValid) return;

    if (file === undefined) return;
    const result = URL.createObjectURL(file);
    onChangeFileUrls(result, props.props.index);

    props.props.setValue("image", result);
    void props.props.trigger("image");
    console.log("여긴온다니??");
    const newFiles = [...props.props.files];
    newFiles[props.props.index] = file;
    props.props.setFiles(newFiles);
    console.log("fie1111::", JSON.stringify(file));
  };
  return { onClickUpload, onChangeFile };
}
