import React from "react";
import { withCasaVacanzaConsumer } from "../CasaVacanza/context"
import Loading from "./Loading";
import CaseVacanzaFilter from './CaseVacanzaFiltro';
import CaseVacanzaList from "./CaseVacanzaLista";

function CasaVacanzaContainer({ context }) {
  const { loading, sortedCaseVacanza, caseVacanza } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <CaseVacanzaFilter casaVacanza={caseVacanza} />
      <CaseVacanzaList caseVacanza={sortedCaseVacanza} />
    </>
  );
}

export default withCasaVacanzaConsumer(CasaVacanzaContainer);
