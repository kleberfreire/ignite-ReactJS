import { useContext, useEffect } from "react";
import { Can } from "../components/ Can";
import { AuthContext } from "../context/AuthContext";
import { useCan } from "../hooks/useCan";
import { setupAPIClient } from "../services/api";
import { api } from "../services/apiClient";

import { withSSRAuth } from "../utils/withSSRAuth";

export default function Dashboard() {
  const { user, signOut, broadcastAuth } = useContext(AuthContext);
  function handleSignOut() {
    broadcastAuth.current.postMessage("signOut");
    signOut();
  }

  useEffect(() => {
    api
      .get("/me")
      .then((response) => {})
      .catch((error) => {});
  }, []);

  return (
    <div>
      <h1>Dashboard: {user?.email}</h1>
      <button onClick={handleSignOut}>sign out</button>
    </div>
  );
}

export const getServerSideProps = withSSRAuth(
  async (ctx) => {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    return {
      props: {},
    };
  },
  {
    permissions: ["metrics.list"],
    roles: ["adminstrator"],
  }
);
