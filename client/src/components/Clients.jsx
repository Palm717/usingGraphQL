import { useQuery } from "@apollo/client";
import { queries } from "../queries/clientQueries";

import ClientRow from "./ClientRow";
import Spinner from "./Spinner";

const { GET_CLIENTS } = queries;

export default function Clients() {
  const { loading, errors, data } = useQuery(GET_CLIENTS);

  if (loading) return <Spinner />;
  if (errors) return <p>Something went wrong...</p>;

  return (
    <>
      {!loading && !errors && (
        <table className="table table-hover mt-3">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {data.clients.map((client) => (
              <ClientRow key={client.id} client={client} />
            ))}
          </tbody>
        </table>
      )}
    </>
  );
}
