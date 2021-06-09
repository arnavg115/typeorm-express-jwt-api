import React, { FC } from "react";
import { RouteComponentProps } from "react-router-dom";
import { useByeQuery } from "../generated/graphql";
export const Bye: FC<RouteComponentProps> = ({}) => {
  const { data, error, loading } = useByeQuery({
    fetchPolicy: "network-only",
  });

  if (loading) {
    return <div>Loading</div>;
  }

  if (error) {
    console.log(error);
    return <div>err</div>;
  }
  if (!data) {
    return <div>no data</div>;
  }
  return <div>Hello {data.bye}</div>;
};
