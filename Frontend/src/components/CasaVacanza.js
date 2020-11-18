import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import PropTypes from "prop-types";
import { memo } from "react";
import {CasaVacanzaProvider} from "../CasaVacanza/context";
const CasaVacanza = memo(({ casaVacanza }) => {
  const { name, slug, images, price } = casaVacanza;
  // console.log(name);
  return (
    <article className="casaVacanza">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="single casaVacanza" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/caseVacanza/${slug}`} className="btn-primary room-link">
          features
        </Link>
      </div>
      <p className="casaVacanza-info">{name}</p>
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
