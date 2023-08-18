import { Modal } from "antd";
import { type IFormData } from "../../../units/sign/signup/SignUp.types";
import { useMutationCreateUser } from "../mutation/useMutationCreateUser";
import { useRouter } from "next/router";

export const useSignUp = () => {
  const [createUser] = useMutationCreateUser();
  const router = useRouter();

  const onClickSubmit = async (data: IFormData) => {
    try {
      const result = await createUser({
        variables: {
          createUserInput: {
            email: data.email,
            name: data.name,
            password: data.password,
          },
        },
      });
      void router.push("/login");
    } catch (error) {
      if (error instanceof Error) {
        Modal.error({
          title: "This is an error message",
          content: error.message,
        });
      }
    }
  };
  return {
    onClickSubmit,
  };
};
