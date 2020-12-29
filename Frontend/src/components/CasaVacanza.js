import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import {CasaVacanzaProvider} from "../CasaVacanza/context";

import './CasaVacanza.css';

const CasaVacanza = memo(({ casaVacanza }) => {
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
};
export default CasaVacanza;
