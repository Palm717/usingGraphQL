import { FaTrash } from "react-icons/fa";
import { useMutation } from "@apollo/client";
import { mutations } from "../mutations/clientMutations";
import { queries } from "../queries/clientQueries";

const { GET_CLIENTS } = queries;
const { DELETE_CLIENT } = mutations;

export default function ClientRow({ client }) {
  const [deleteClient] = useMutation(DELETE_CLIENT, {
    //delete from the client id specific to the client being deleted
    variables: { id: client.id },

    update(cache, { data: { deleteClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENTS });
      cache.writeQuery({
        query: GET_CLIENTS,
        data: {
          clients: clients.filter((client) => client.id !== deleteClient.id),
        },
      });
    },
  });
  return (
    <tr>
      <td>{client.name}</td>
      <td>{client.email}</td>
      <td>{client.phone}</td>
      <td>
        <button className="btn btn-danger btn-sm" onClick={deleteClient}>
          <FaTrash />
        </button>
      </td>
    </tr>
  );
}
