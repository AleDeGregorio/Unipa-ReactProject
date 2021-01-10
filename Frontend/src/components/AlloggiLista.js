import React from "react";
import Alloggio from "./Alloggio";

import './AlloggiLista';

class AlloggiList extends React.Component {

  render() {
    var datiCase = this.props.case ? this.props.case : [];
    var servizi = this.props.servizi ? this.props.servizi : [];
    var checkIn = this.props.checkIn ? this.props.checkIn : '';
    var checkOut = this.props.checkOut ? this.props.checkOut : '';
    var tipo = this.props.tipo ? this.props.tipo : '';

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
            return <Alloggio 
              key={item.id} 
              casaVacanza={item} 
              datiRicerca = {datiCase} 
              servizi = {servizi} 
              checkIn = {checkIn} 
              checkOut = {checkOut}
              tipo = {tipo}
            />;
          })}
        </div>
      </section>
    );
  }
};

export default AlloggiList;
