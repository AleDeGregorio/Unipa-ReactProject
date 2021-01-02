import React from "react";
import CasaVacanza from "./CasaVacanza";

import './CaseVacanzaLista';

class CaseVacanzaList extends React.Component {

  render() {
    var datiCase = this.props.case ? this.props.case : [];

    if (datiCase.length === 0) {
      return (
        <div className="empty-search">
          <h3>Nessun alloggio trovato...</h3>
        </div>
      );
    }

    return (
      <section className="caseVacanzalist">
        <div className="caseVacanzalistDiv">
          {datiCase.map(item => {
            return <CasaVacanza key={item.id} casaVacanza={item} />;
          })}
        </div>
      </section>
    );
  }
};

/*const CaseVacanzaList = ({ caseVacanza }) => {
  if (caseVacanza.length === 0) {
    return (
      <div className="empty-search">
        <h3>unfortunately no rooms matched your search parameters</h3>
      </div>
    );
  }
  return (
    <section className="caseVacanzalist">
      <div className="caseVacanzalistDiv">
        {caseVacanza.map(item => {
          return <CasaVacanza key={item.id} casaVacanza={item} />;
        })}
      </div>
    </section>
  );
};*/

export default CaseVacanzaList;
