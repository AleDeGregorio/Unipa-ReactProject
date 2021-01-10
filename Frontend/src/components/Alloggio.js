import React from "react";
import { Link } from "react-router-dom";
import './Alloggio.css';

class Alloggio extends React.Component {

  render() {
    //const { name, slug, images, price } = casaVacanza;
    // console.log(name);
    var dati_casa = this.props.casaVacanza ? this.props.casaVacanza : '';
    var datiRicerca = this.props.datiRicerca ? this.props.datiRicerca : '';
    var servizi = this.props.servizi ? this.props.servizi : [];
    var checkIn = this.props.checkIn ? this.props.checkIn : '';
    var checkOut = this.props.checkOut ? this.props.checkOut : '';
    var tipo = this.props.tipo ? this.props.tipo : '';

    return (
      <article className="casaVacanza">
          <div className="containerFoto">
            <img src={dati_casa.img1} alt="single casaVacanza" className="fotoAlloggi"/>
          </div>
          <div className="info">
            <h5 className="casaVacanza-info">{dati_casa.nome_proprieta}</h5>
            <div className="descrizione">
              <p className="casaVacanza-info">Località: {dati_casa.localita}</p>
              <p className="casaVacanza-info">Capienza: {dati_casa.posti} {dati_casa.posti === 1 ? 'ospite' : 'ospiti'}</p>
            </div>
            <div className="price-top">
              <h6>€{dati_casa.costo} ({dati_casa.ngiorni} {dati_casa.ngiorni === 1 ? 'giorno' : 'giorni'})</h6>
            </div>
            <div className="bottoneLink">
              <Link 
                to = {{
                  pathname: "/Alloggio",
                  state: {
                    dati_casa: {dati_casa},
                    datiRicerca: {datiRicerca},
                    servizi: {servizi},
                    checkIn: {checkIn},
                    checkOut: {checkOut},
                    tipo: {tipo}
                  }
                }}
                className = "vai"
              >
                Visualizza dettagli
              </Link>
            </div>
        </div>
      </article>
    );
  }
}

export default Alloggio;
