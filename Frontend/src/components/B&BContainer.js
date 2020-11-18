import React from "react";
import { withCasaBandbConsumer } from "../B&B/context"
import Loading from "./Loading";
import CaseBandbFilter from './B&BFilter';
import CaseBandbList from "./B&BList";

function CasaBandbContainer({ context }) {
  const { loading, sortedCaseBandb, caseBandb } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <CaseBandbFilter casaBandb={caseBandb} />
      <CaseBandbList caseBandb={sortedCaseBandb} />
    </>
  );
}

export default withCasaBandbConsumer(CasaBandbContainer);
