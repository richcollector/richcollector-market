import * as yup from "yup";

function isValidFileType(file: string) {
  return file.includes("blob");
}

export const schmaInfo = yup.object({
  name: yup.string().required("이름은 필수 입력입니다."),
  image: yup
    .string()
    .required("이미지는 필수 등록입니다.")
    .test("is-valid", (value) => isValidFileType(value)),
});
