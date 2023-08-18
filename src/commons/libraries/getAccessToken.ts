import { gql } from "@apollo/client";
import { GraphQLClient } from "graphql-request";
import { type IMutation } from "../types/generated/types";

const RESTORE_ACCESS_TOKEN = gql`
  mutation {
    restoreAccessToken {
      accessToken
    }
  }
`;

export const getAccessToken = async (): Promise<string | undefined> => {
  try {
    const graphQlClient = new GraphQLClient(
      `${process.env.NEXT_PUBLIC_BASE_API}`,
      { credentials: "include" },
    );
    const result = await graphQlClient.request<
      Pick<IMutation, "restoreAccessToken">
    >(RESTORE_ACCESS_TOKEN);
    const newAccessToken = result.restoreAccessToken.accessToken;
    return newAccessToken;
  } catch (error) {
    if (error instanceof Error) console.log("error::", error.message);
  }
};
