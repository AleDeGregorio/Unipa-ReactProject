import React from "react";
import { withCasaVacanzaConsumer } from "../CasaVacanza/context"
import Loading from "./Loading";
import CaseVacanzaFilter from './CaseVacanzaFiltro';
import CaseVacanzaList from "./CaseVacanzaLista";

import './CaseVacanzaLista.css'

function CasaVacanzaContainer({ context }) {
  const { loading, sortedCaseVacanza, caseVacanza } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <CaseVacanzaFilter casaVacanza={caseVacanza} />
      <div className="ListaProp">
      <CaseVacanzaList caseVacanza={sortedCaseVacanza} />
      </div>
    </>
  );
}

export default withCasaVacanzaConsumer(CasaVacanzaContainer);
