import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import { CasaVacanzaContext } from "../CasaVacanza/context";
import {Col, Row} from "react-bootstrap"
import './Riepilogo.css'
import StyledHero from "../components/StyledHero";

export default class SingleCasaVacanza extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_casa: this.props.history.location.state.dati_casa.dati_casa ? this.props.history.location.state.dati_casa.dati_casa : []
    };
  }

  render() {
    if (dati_casa === []) {
      return (
        <div className="error">
          <h3> Casa vacanza non trovata...</h3>
          <Link to="/CaseVacanza" className="return">
          Ritorna alla pagina di ricerca
          </Link>
        </div>
      );
    }
    
    var dati_casa = this.state.dati_casa;
    var images = [dati_casa.img1, dati_casa.img2, dati_casa.img3, dati_casa.img4];
    console.log(images);

    return (
       <>
         <div className="contenitoreRiepilogo">
           <StyledHero img={dati_casa.img1}>
             <Banner title={dati_casa.nome_proprieta}>
               <Link to="/CaseVacanza" className="return">
                Ritorna alla pagina di ricerca
               </Link>
             </Banner>
           </StyledHero>
           
           <section className="single-room">
             <div className="single-room-images">
               {images.map(item => (
                 <img src={item} alt={"foto"} className="riepilogoImg"/>
               ))}
             </div>
             <div className="single-room-info">
               <article className="desc">
                 <h3>DETTAGLI</h3>
                 <p>{dati_casa.descrizione}</p>
               </article>
               <div className="sistemaPagina">
               <article className="info">
                 <h3>INFO</h3>
                 <h6>Prezzo: €{dati_casa.costo} per {dati_casa.ngiorni} giorni</h6>
                 <h6>
                   Capacità massima: {dati_casa.posti} {dati_casa.posti === 1 ? 'persona' : 'persone'}
                 </h6>
                 <h6>Localita e indirizzo: {dati_casa.localita} ({dati_casa.provincia}), {dati_casa.indirizzo}</h6>
                 <h6>Tipo di alloggio: {dati_casa.tipo_proprieta === 'bb' ? 'Bed&Breakfast' : 'Casa vacanza'}</h6>
               </article>
               <article className="room-extras">
                 <h3>SERVIZI</h3>
                 <ul className="extras">
                   {images.map((item, index) => (
                   <li key={index}>- {item}</li>
                   ))}
                 </ul>
               </article>
               </div>
             </div>
           </section>
               <button className="bottonePrenota">PRENOTA</button>
           </div>
       </>
     );
   }
}



/*export default class SingleCasaVacanza extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBcg: defaultBcg
    };
  }
  static contextType = CasaVacanzaContext;

   componentDidMount() {
     console.log(this.props);
   }
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
              <div className="sistemaPagina">
              <article className="info">
                <h3>INFO</h3>
                <h6>Prezzo: {price}€</h6>
                <h6>Dimensioni: {size} m²</h6>
                <h6>
                  Capacità massima: {capacity >  1 ? `${capacity} persone` : `${capacity}  persona`}
                </h6>
                <h6>{wify ? "Animali consentiti" : "Animali non consentiti"}</h6>
                <h6>{ariaCondizionata && "Colazione inclusa"}</h6>
              </article>
              <article className="room-extras">
                <h3>SERVIZI</h3>
                <ul className="extras">
                  {extras.map((item, index) => (
                  <li key={index}>- {item}</li>
                  ))}
                </ul>
              </article>
              </div>
            </div>
          </section>
              <button className="bottonePrenota">PRENOTA</button>
          </div>
      </>
    );
  }
}*/
