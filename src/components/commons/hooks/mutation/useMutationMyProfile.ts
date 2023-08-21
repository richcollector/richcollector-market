import { gql, useMutation } from "@apollo/client";
import type {
  IMutation,
  IMutationResetUserPasswordArgs,
  IMutationUpdateUserArgs,
} from "../../../../commons/types/generated/types";

const RESET_USER_PASSWORD = gql`
  mutation resetUserPassword($password: String!) {
    resetUserPassword(password: $password)
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($updateUserInput: UpdateUserInput!) {
    updateUser(updateUserInput: $updateUserInput) {
      _id
      name
      picture
    }
  }
`;

export function useMutationResetPassword() {
  const mutation = useMutation<
    Pick<IMutation, "resetUserPassword">,
    IMutationResetUserPasswordArgs
  >(RESET_USER_PASSWORD);
  return mutation;
}

export function useMutationUodateUser() {
  const mutation = useMutation<
    Pick<IMutation, "updateUser">,
    IMutationUpdateUserArgs
  >(UPDATE_USER);
  return mutation;
}
