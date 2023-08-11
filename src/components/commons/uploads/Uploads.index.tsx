import { useRef } from "react";
import type { IUploadsProps } from "./Uploads.types";
import { UploadButton, UploadFileHidden, UploadImage } from "./Uploads.styles";
import { useFileUpload } from "../hooks/customs/useFileUpload";

export default function Uploads01(props: IUploadsProps) {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const { ref } = props.register;
  const { onClickUpload, onChangeFile } = useFileUpload({
    fileRef,
    props,
  });

  return (
    <>
      {props.fileUrl !== "" ? (
        <UploadImage onClick={onClickUpload} src={`${props.fileUrl}`} />
      ) : (
        <UploadButton onClick={onClickUpload}>
          <>+</>
          <>Upload</>
        </UploadButton>
      )}
      <UploadFileHidden
        type="file"
        ref={(e) => {
          ref(e);
          fileRef.current = e;
        }}
        onChange={onChangeFile}
      />
    </>
  );
}
