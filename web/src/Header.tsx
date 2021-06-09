import React from "react";
import { Link } from "react-router-dom";
import { setToken } from "./accessToken";
import { useLogoutMutation, useMeQuery } from "./generated/graphql";

export default function Header() {
  const { data, loading } = useMeQuery({ fetchPolicy: "network-only" });
  const [logout, { client }] = useLogoutMutation();
  let body = null;
  if (loading) {
    body = null;
  } else if (data && data.me) {
    body = <div>You are logged in as {data.me.email}</div>;
  } else {
    body = <div>Not logged in</div>;
  }
  return (
    <header>
      <div>
        <Link to="/register">register</Link>
      </div>
      <div>
        <Link to="/login">login</Link>
      </div>
      <div>
        <Link to="/">Home</Link>
      </div>
      <div>
        <Link to="/bye">bye</Link>
      </div>
      <div>
        {!loading && data && data.me ? (
          <button
            onClick={async () => {
              await logout();
              setToken("");
              await client.resetStore();
            }}
          >
            Logout
          </button>
        ) : null}
      </div>
      {body}
    </header>
  );
}
