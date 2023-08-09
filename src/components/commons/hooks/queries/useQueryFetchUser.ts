import { gql, useQuery } from "@apollo/client";
import { type IQuery } from "../../../../commons/types/generated/types";

const FETCH_USER = gql`
  query {
    fetchUserLoggedIn {
      _id
      email
      name
      picture
      userPoint {
        _id
        amount
      }
    }
  }
`;

export const useQueryFetchUser = () => {
  const query = useQuery<Pick<IQuery, "fetchUserLoggedIn">>(FETCH_USER);

  return query;
};
