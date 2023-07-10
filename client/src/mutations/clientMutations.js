import { gql } from "@apollo/client";

export const mutations = {
  DELETE_CLIENT: gql`
    mutation deleteClient($id: ID!) {
      deleteClient(id: $id) {
        id
        name
        email
        phone
      }
    }
  `,
};
