import React from "react";
import CasaVacanza from "./CasaVacanza";

import './CaseVacanzaLista';

class CaseVacanzaList extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      case: this.props.case ? this.props.case : []
    }
  }

  render() {
    return (
      <section className="caseVacanzalist">
        <div className="caseVacanzalistDiv">
          {this.state.case.map(item => {
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
