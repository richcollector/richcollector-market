import * as yup from "yup";

function isValidFileType(file: string) {
  return file.includes("blob");
}

export const schema = yup.object({
  name: yup.string().required("제품명은 필수 입력입니다."),
  remarks: yup.string().required("한줄요약은 필수 입력입니다."),
  contents: yup.string().required("상품설명은 필수 입력입니다."),
  price: yup.number().required("가격은 필수 입력입니다."),
  tags: yup.string().required("태그는 필수 입력입니다."),
  image: yup
    .string()
    .required("이미지는 필수 등록입니다.")
    .test("is-valid-type", "Not a valid image type", (value) =>
      isValidFileType(value),
    ),
  address: yup.string(),
  addressDetail: yup.string(),
  lat: yup.number(),
  lng: yup.number(),
});
