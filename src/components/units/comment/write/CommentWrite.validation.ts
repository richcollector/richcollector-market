import * as yup from "yup";

export const schema = yup.object({
  contents: yup.string().required("질문은 필수 입력입니다."),
});
