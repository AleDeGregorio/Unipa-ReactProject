import React, { Component } from "react";
import defaultBcg from "../images/room-1.jpeg";
import Hero from "../components/Hero";
import Banner from "../components/Banner";
import { Link } from "react-router-dom";
import {Col, Row, Accordion} from 'react-bootstrap'
import './Riepilogo.css'
import StyledHero from "../components/StyledHero";

export default class RiepilogoAlloggio extends Component {

  constructor(props) {
    super(props);

    this.state = {
      dati_casa: this.props.history.location.state ? this.props.history.location.state.dati_casa.dati_casa : [],
      dati_servizi: this.props.history.location.state ? this.props.history.location.state.servizi.servizi : [],
      checkIn: this.props.history.location.state ? this.props.history.location.state.checkIn.checkIn : '',
      checkOut: this.props.history.location.state ? this.props.history.location.state.checkOut.checkOut : '',
      tipo: this.props.history.location.state ? this.props.history.location.state.tipo.tipo : '',
      datiRicerca: this.props.history.location.state ? this.props.history.location.state.datiRicerca.datiRicerca : [],
      servizi: [],
      numPosti: [],
      posti: this.props.history.location.state ? this.props.history.location.state.dati_casa.dati_casa.posti : 1
    };
  }

  componentDidMount() {
    this.setState({
      servizi: this.state.dati_casa.servizi ? this.state.dati_casa.servizi.replace(/\s*,\s*/g, ",").split(',') : []
    });

    var array = [];

    for(var i = 0; i < this.state.dati_casa.posti; i++) {
      array[i] = i;
      array[i]++;
    }

    this.setState({ numPosti: array })
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value })
  }

  render() {
    if (dati_casa === []) {
      return (
        <div className="error">
          <h3> Casa vacanza non trovata...</h3>
          <Link 
            to = {{
              pathname: "/CaseVacanza",
              state: {
                case: this.state.datiRicerca,
                posti: this.state.dati_casa.posti,
                localita: this.state.dati_casa.localita,
                checkIn: this.state.dati_casa.checkIn,
                checkOut: this.state.dati_casa.checkOut
              }
            }}
            className = "return"
          >
            Ritorna alla pagina di ricerca
          </Link>
        </div>
      );
    }

    var login;

    if(!localStorage.getItem('logged')) {
      login = (
        <>
          <p><span style = {{color: "red", fontWeight: 'bold'}}>Attenzione! </span>Devi essere registrato per potere prenotare</p>
          <span>
            Clicca&nbsp;
          </span>
          <Link 
            to = {{
              pathname: "/autenticazioneAccedi",
              state: {
                dati_casa: this.state.dati_casa,
                posti: this.state.posti,
                checkIn: this.state.checkIn,
                checkOut: this.state.checkOut
              }
            }}
            className = "return"
            style = {{fontWeight: 'bold', fontStyle: 'italic'}}
          >
            qui&nbsp;
          </Link>
          <span>per effettuare l'accesso oppure registrarti</span>
        </>
      ); 
    }
    
    var dati_casa = this.state.dati_casa;
    var images = [dati_casa.img1, dati_casa.img2, dati_casa.img3, dati_casa.img4];
    var servizi = this.state.servizi;

    return (
       <>
       <div className="contieneContenitore">
         <div className="contenitoreRiepilogo">
           <StyledHero img={dati_casa.img1}>
             <Banner title={dati_casa.nome_proprieta}>
              <Link 
                to = {{
                  pathname: "/RisultatiRicerca",
                  state: {
                    case: this.state.datiRicerca,
                    posti: this.state.dati_casa.posti,
                    localita: this.state.dati_casa.localita,
                    tipo: this.state.dati_casa.tipo_proprieta,
                    checkIn: this.state.checkIn,
                    checkOut: this.state.checkOut,
                    tipo: this.state.tipo
                  }
                }}
                className = "return"
              >
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
                 <h6>Prezzo: €{dati_casa.costo} per {dati_casa.ngiorni} {dati_casa.ngiorni === 1 ? 'giorno' : 'giorni'}</h6>
                 <h6>
                  Capacità massima: {dati_casa.posti} {dati_casa.posti === 1 ? 'persona' : 'persone'}
                 </h6>
                 <h6>Localita e indirizzo: {dati_casa.localita} ({dati_casa.provincia}), {dati_casa.indirizzo}</h6>
                 <h6>Tipo di alloggio: {dati_casa.tipo_proprieta === 'bb' ? 'Bed&Breakfast' : 'Casa vacanza'}</h6>
               </article>
               <article className="room-extras">
                 <h3>SERVIZI</h3>
                 <ul className="extras">
                   {servizi.map(item => (
                   <li>- {item}</li>
                   ))}
                 </ul>
               </article>
               </div>
             </div>
           </section>
            <Accordion>
              <Accordion.Toggle eventKey="0" id="prenotaDrop">Prenota</Accordion.Toggle >
              <Accordion.Collapse eventKey="0">
              <div className="prenotazioni">
                <p>I dati della tua prenotazione</p>
                <div className="sceltaDate">
                  <div>
                    <p>Check-in</p>
                    <input type = "text" value = {this.state.checkIn}></input>
                  </div>
                  <div>
                    <p>Check-out</p>
                    <input type="text" value = {this.state.checkOut}></input>
                  </div>
                </div>
                <div className="containerSelect">
                  <p>Numero ospiti</p>
                 <select onChange = {this.onChange} id="posti" value = {this.state.posti}>
                    {this.state.numPosti.map(item => (
                      <option value = {item} id = "posti">{item}</option>
                    ))}
                  </select>
                </div>
                {login}
                <Link 
                  to = {{
                    pathname: "/Prenota",
                    state: {
                      dati_casa: this.state.dati_casa,
                      posti: this.state.posti,
                      checkIn: this.state.checkIn,
                      checkOut: this.state.checkOut
                    }
                  }}
                  className = "return"
                >
                  <button 
                    className="bottonePrenota" 
                    disabled = {!localStorage.getItem('logged')} 
                    style = {{backgroundColor: localStorage.getItem('logged') ? 'black' : 'grey'}}>
                    PRENOTA
                  </button>
                </Link>
              </div>
              </Accordion.Collapse>
            </Accordion> 
           </div>
           </div>
       </>
     );
   }
}