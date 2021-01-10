import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// Fissi in ogni pagina
import Navbar from './components/NavBar'
import Footer from './components/Footer'

// Pagine generali
import HomePage from './components/HomePage'
import ErrorPage from './components/ErrorPage'
import Alloggi from './Pagine/Alloggi'
import RiepilogoAlloggio from './Pagine/RiepilogoAlloggio';
import BandB from './Pagine/B&B'
//import PaginaDettagli from './PaginaDettagli/PaginaDettagli'

//Prenotazione
import Prenota from './Prenota/Prenota'

// Login e registrazione
import AutenticazioneAccedi from './Autenticazione/autenticazioneAccedi'
import AutenticazioneRegistrati from './Autenticazione/autenticazioneRegistrati'
import AutenticazioneRegistratiCliente from './Autenticazione/autenticazioneRegistratiCliente'
import AutenticazioneRegistratiProprietario from './Autenticazione/autenticazioneRegistratiProprietario'

// Area personale del cliente
import GestionePrenotazione from './GestioneUtente/GestionePrenotazione'
import DiventaHost from './GestioneUtente/DiventaHost'

// Area personale del proprietario
import ProprietarioPage from './GestioneProprietario/ProprietarioPage'

// Gestione prenotazione
import Testina from './GestioneProprietario/Accettazione/Testina'
import Checkin from './GestioneProprietario/Checkin/Checkin'
import CheckinEffettuato from './GestioneProprietario/Checkin/CheckinEffettuato'

// Inserimento proprietà
import InserimentoProprietà from './GestioneProprietario/InserisciProp/InserimentoProprietà';
import InserimentoCasaVacanza from './GestioneProprietario/InserisciProp/inserimentoCasaVacanza'
import InserimentoBnB from './GestioneProprietario/InserisciProp/inserimentoB&B'
import ElencoBnB2 from './GestioneProprietario/InserisciProp/ElencoB&B'
import InserimentoStanzaBnB from './GestioneProprietario/InserisciProp/InserimentoStanzaBnB'

// Modifica proprietà
import SceltaModifica from './GestioneProprietario/Modifica/SceltaModifica'
import ElencoCasaVacanza from './GestioneProprietario/Modifica/ElencoCasaVacanza'
import ModificaCasaVacanza from './GestioneProprietario/Modifica/ModificaCasaVacanza'
import ElencoBeB from './GestioneProprietario/Modifica/ElencoB&B'
import ModificaBeB from './GestioneProprietario/Modifica/ModificaB&B'
import ElencoListaStanze from './GestioneProprietario/Modifica/ElencoListaStanze'
import ModificaStanza from './GestioneProprietario/Modifica/ModificaStanza'

// Gestione account
import DatiPersonali from './GestioneProprietario/DatiPersonali'

// Resoconto guadagni
import Earning2 from './GestioneProprietario/Earning/Earning2'

import 'bootstrap/dist/css/bootstrap.min.css'

Storage.prototype.setObj = function(key, obj) {
  return this.setItem(key, JSON.stringify(obj))
}
Storage.prototype.getObj = function(key) {
  return JSON.parse(this.getItem(key))
}

class App extends React.Component {

  constructor() {
    super();

    this.state = { 
      email: '',
      password: '',
      apiResponse: [],
      error: false,
      errorMessage: '',
      successCliente: false,
      successProprietario: false
    };
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitLogin = (e) => {
    this.refresh();

    e.preventDefault();
    // get form data out of state
    const data = {
      email: this.state.email,
      password: this.state.password,
    };

    fetch('http://localhost:9000/login/logged', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((result) => result.text())
    .then((result) => {
      this.setState({ apiResponse: JSON.parse(result) });

      if(this.state.apiResponse.status === 'error') {
        this.setState({ error: true });
        this.setState({ errorMessage: this.state.apiResponse.message });
      }
      else {
        localStorage.setItem('logged', true);
        localStorage.setObj('user_data', this.state.apiResponse);

        var cliente = this.state.apiResponse[0].email_cl ? true : false;
        var proprietario = this.state.apiResponse[0].email_prop ? true : false;
        
        if(cliente) {
          localStorage.setItem('cliente', true);
          localStorage.setItem('email', this.state.apiResponse[0].email_cl);
        }
        else if (cliente && proprietario){
          localStorage.setItem('proprietario', true);
          localStorage.setItem('cliente', true)
          localStorage.setItem('email', this.state.apiResponse[0].email_prop);
        }
        else {
          localStorage.setItem('proprietario', true);
          localStorage.setItem('email', this.state.apiResponse[0].email_prop);
        }
      }
    });
  }

  refresh = (e) => {
    this.setState({ 
      error: false,
      errorMessage: '' 
    });
  }
  
  render() {
    return (
      <Router>
      <div className="App">
          <Navbar />

            <Switch>

              <Route 
                exact path="/"
                render = { (props) => (
                  <HomePage {...props}/>
                )}
              />
              <Route 
                exact path = '/ErrorPage'
                render = { (props) => (
                  <ErrorPage {...props} 
                />)}
              />
              <Route 
                exact path="/RisultatiRicerca"
                render = { (props) => (
                  <Alloggi {...props}/>
                )}
              />
              <Route 
                exact path="/Alloggio"
                render = { (props) => (
                  <RiepilogoAlloggio {...props}/>
                )}
              />
              <Route 
                exact path="/B&B"
                render = { (props) => (
                  <BandB {...props}/>
                )}
              />

              <Route
                exact path="/Prenota"
                  render= { (props) =>(
                    <Prenota {...props} />
                  )}
              />
              <Route 
                exact path = '/autenticazioneAccedi'
                render = { (props) => (
                  <AutenticazioneAccedi {...props}
                    onChange = {this.onChange}
                    onSubmitLogin = {this.onSubmitLogin}
                    error = {this.state.error}
                    errorMessage = {this.state.errorMessage}
                  />
                )}
              />
              <Route 
                exact path="/autenticazioneRegistrati"
                render = { (props) => (
                  <AutenticazioneRegistrati {...props}/>
                )}
              />
              <Route 
                exact path="/autenticazioneRegistratiCliente"
                render = { (props) => (
                  <AutenticazioneRegistratiCliente {...props}/>
                )}
              />
              <Route 
                exact path="/autenticazioneRegistratiProprietario"
                render = { (props) => (
                  <AutenticazioneRegistratiProprietario {...props}/>
                )}
              />
              <Route 
                exact path="/GestionePrenotazione"
                render = { (props) => (
                  <GestionePrenotazione {...props}/>
                )}
              />

              <Route
                exact path="/DiventaHost"
                render = { (props) => (
                  <DiventaHost {...props}/>
                )}
              />
              <Route 
                exact path="/PaginaProprietario"
                render = { (props) => (
                  <ProprietarioPage {...props}/>
                )}
              />
              <Route 
                exact path="/Testina"
                render = { (props) => (
                  <Testina {...props}/>
                )}
              />
              <Route 
                exact path="/Checkin"
                render = { (props) => (
                  <Checkin {...props}/>
                )}
              />
              <Route 
                exact path="/CheckinEffettuato"
                render = { (props) => (
                  <CheckinEffettuato {...props}/>
                )}
              />
              <Route 
                exact path="/InserimentoProprietà"
                render = { (props) => (
                  <InserimentoProprietà {...props}/>
                )}
              />
              <Route 
                exact path="/InserimentoCasaVacanza"
                render = { (props) => (
                  <InserimentoCasaVacanza {...props}/>
                )}
              />
              <Route 
                exact path="/InserimentoBnb"
                render = { (props) => (
                  <InserimentoBnB {...props}/>
                )}
              />
              <Route 
                exact path="/ElencoBnB2"
                render = { (props) => (
                  <ElencoBnB2 {...props}/>
                )}
              />
              <Route 
                exact path="/InserimentoStanzaBnB"
                render = { (props) => (
                  <InserimentoStanzaBnB {...props}/>
                )}
              />
              <Route 
                exact path="/SceltaModifica"
                render = { (props) => (
                  <SceltaModifica {...props}/>
                )}
              />
              <Route 
                exact path="/ElencoCasaVacanza"
                render = { (props) => (
                  <ElencoCasaVacanza {...props}/>
                )}
              />
              <Route 
                exact path = '/ModificaCasaVacanza'
                render = { (props) => (
                  <ModificaCasaVacanza {...props}/>
                )}
              />
              <Route 
                exact path="/ElencoB&B"
                render = { (props) => (
                  <ElencoBeB {...props}/>
                )}
              />
              <Route 
                exact path = '/ModificaB&B'
                render = { (props) => (
                  <ModificaBeB {...props}/>
                )}
              />
              <Route 
                exact path = '/ElencoListaStanze'
                render = { (props) => (
                  <ElencoListaStanze {...props}/>
                )}
              />
              <Route 
                exact path = '/ModificaStanza'
                render = { (props) => (
                  <ModificaStanza {...props}/>
                )}
              />
              <Route 
                exact path="/DatiPersonali"
                render = { (props) => (
                  <DatiPersonali {...props}/>
                )}
              />
              <Route 
                exact path="/Earning"
                render = { (props) => (
                  <Earning2 {...props}/>
                )}
              />

            </Switch> 

          <Footer/>

          </div>

        </ Router>
      );
  }
}

export default App;
