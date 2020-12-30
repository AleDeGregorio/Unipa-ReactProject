import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import {CasaVacanzaProvider} from "../CasaVacanza/context";

import './CasaVacanza.css';

class CasaVacanza extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_casa: this.props.casaVacanza ? this.props.casaVacanza : ''
    }
  }

  render() {
    //const { name, slug, images, price } = casaVacanza;
    // console.log(name);
    var dati_casa = this.state.dati_casa;
    return (
      <article className="casaVacanza">
          <img src={dati_casa.img1} alt="single casaVacanza" />
          <div className="info">
          <div className="price-top">
            <h6>€{dati_casa.tariffa}/notte</h6>
          </div>
            <p className="casaVacanza-info">{dati_casa.nome_proprieta}</p>
            <p className="casaVacanza-info">Per {dati_casa.posti} {dati_casa.posti === 1 ? 'ospite' : 'ospiti'}</p>
            <Link to={""} className="vai">
            Visualizza dettagli
            </Link>
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
