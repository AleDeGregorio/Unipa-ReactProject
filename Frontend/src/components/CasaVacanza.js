import React from "react";
import { Link } from "react-router-dom";
import './CasaVacanza.css';

class CasaVacanza extends React.Component {

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
          <img src={dati_casa.img1} alt="single casaVacanza" />
          <div className="info">
          <div className="price-top">
            <h6>€{dati_casa.costo} ({dati_casa.ngiorni} {dati_casa.ngiorni === 1 ? 'giorno' : 'giorni'})</h6>
          </div>
            <p className="casaVacanza-info">{dati_casa.nome_proprieta}</p>
            <p className="casaVacanza-info">{dati_casa.localita}</p>
            <p className="casaVacanza-info">Per {dati_casa.posti} {dati_casa.posti === 1 ? 'ospite' : 'ospiti'}</p>
            <div className="bottoneLink">
              <Link 
                to = {{
                  pathname: "/Casa",
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

/*const CasaVacanza = memo(({ casaVacanza }) => {
  const { name, slug, images, price } = casaVacanza;
  // console.log(name);
  return (
    <article className="casaVacanza">
        <img src={images[0] || defaultImg} alt="single casaVacanza" />
        <div className="info">
        <div className="price-top">
          <h6>${price} a notte</h6>
        </div>
          <p className="casaVacanza-info">{name}</p>
          <Link to={`/caseVacanza/${slug}`} className="vai">
          visita pagina
          </Link>
      </div>
    </article>
  );
});

CasaVacanza.propTypes = {
  casaVacanza: PropTypes.shape({
    name: PropTypes.string.isRequired,
    slug: PropTypes.string.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    price: PropTypes.number.isRequired
  })
};*/

export default CasaVacanza;
