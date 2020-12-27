import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { CasaBandBContext } from "../B&B/context";

//import StyledHero from "../components/StyledHero";
export default class RiepilogoCasaBandb extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = CasaBandBContext;

  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    const { getCasaBandB } = this.context;
    const casaBandB = getCasaBandB(this.state.slug);

    if (!casaBandB) {
      return (
        <div className="error">
          <h3> Nessun B&B trovato...</h3>
          <Link to="/B&B" className="btn-primary">
            Ritorna alle stanze
          </Link>
        </div>
      );
    }
    const {
      name,
      description,
      capacity,
      size,
      price,
      extras,
      wify,
      ariaCondizionata,
      images
    } = casaVacanza;
    const [main, ...defaultImages] = images;
    console.log(defaultImages);

    return (
      <>
        <StyledHero img={images[0] || this.state.defaultBcg}>
          <Banner title={`${name} casaBandB`}>
            <Link to="/B&B" className="btn-primary">
              ritorna alle stanze
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImages.map((item, index) => (
              <img key={index} src={item} alt={name} />
            ))}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>DETTAGLI</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>INFO</h3>
              <h6>Prezzo: ${price}</h6>
              <h6>Misure: {size} SQFT</h6>
              <h6>
                Capacità massima:
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{wify ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{ariaCondizionata && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras </h6>
          <ul className="extras">
            {extras.map((item, index) => (
              <li key={index}>- {item}</li>
            ))}
          </ul>
        </section>
      </>
    );
  }
}
