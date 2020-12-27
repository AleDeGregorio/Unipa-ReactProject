import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { CasaVacanzaContext } from "../CasaVacanza/context";
import './Riepilogo.css'
import StyledHero from "../components/StyledHero";
export default class SingleCasaVacanza extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = CasaVacanzaContext;

  // componentDidMount() {
  //   console.log(this.props);
  // }
  render() {
    const { getCasaVacanza } = this.context;
    const casaVacanza = getCasaVacanza(this.state.slug);

    if (!casaVacanza) {
      return (
        <div className="error">
          <h3> no such caseVacanza could be found...</h3>
          <Link to="/CaseVacanza" className="return">
            Ritorna alle case vacanza
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
        <div className="contenitoreRiepilogo">
          <StyledHero img={images[0] || this.state.defaultBcg}>
            <Banner title={`${name} casaVacanza`}>
              <Link to="/CaseVacanza" className="return">
                Ritorna alle case vacanza
              </Link>
            </Banner>
          </StyledHero>
          
          <section className="single-room">
            <div className="single-room-images">
              {defaultImages.map((item, index) => (
                <img key={index} src={item} alt={name} className="riepilogoImg"/>
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
                <h6>Dimensioni: {size} SQFT</h6>
                <h6>
                  Capacità massima: 
                  {capacity >  1 ? `${capacity} persone` : `${capacity}  persona`}
                </h6>
                <h6>{wify ? "Animali consentiti" : "Animali non consentiti"}</h6>
                <h6>{ariaCondizionata && "Colazione inclusa"}</h6>
              </article>
            </div>
          </section>
          <section className="room-extras">
            <h3>SERVIZI</h3>
            <ul className="extras">
              {extras.map((item, index) => (
                <li key={index}>- {item}</li>
              ))}
            </ul>
          </section>
          <div className="prenota">
            <label>Prenota la tua esperienza!</label>
            <form className="formPerPrenotare">
              <input type="date"></input>
              <input type="date"></input>
            </form>
            <button>PRENOTA</button>
          </div>
        </div>
      </>
    );
  }
}
