import React from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

// Fissi in ogni pagina
import Navbar from './components/NavBar'
import Footer from './components/Footer'

// Pagine generali
import HomePage from './components/HomePage'
import ErrorPage from './components/ErrorPage'
import CaseVacanza from './Pagine/CaseVacanza'
import RiepilogoCasaVacanza from './Pagine/RiepilogoCasaVacanza';
import BandB from './Pagine/B&B'
//import PaginaDettagli from './PaginaDettagli/PaginaDettagli'

// Login e registrazione
import Autenticazione from './Autenticazione/Autenticazione'
import SecondaAutenticazioneAccedi from './Autenticazione/secondaAutenticazioneAccedi'
import SecondaAutenticazioneRegistrati from './Autenticazione/secondaAutenticazioneRegistrati'
import SecondaAutenticazioneRegistratiCliente from './Autenticazione/secondaAutenticazioneRegistratiCliente'
import SecondaAutenticazioneRegistratiProprietario from './Autenticazione/secondaAutenticazioneRegistratiProprietario'

// Area personale del cliente
import Cliente from './components/ClientePage'
import GestionePrenotazione from './GestioneUtente/GestionePrenotazione'

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
import SceltaModificaBeb from './GestioneProprietario/Modifica/SceltaModificaB&B'
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
      console.log(JSON.parse(result));
      this.setState({ apiResponse: JSON.parse(result) });

      if(this.state.apiResponse.status === 'error') {
        this.setState({ error: true });
        this.setState({ errorMessage: this.state.apiResponse.message });
      }
      else {
        localStorage.setItem('logged', true);
        localStorage.setObj('user_data', this.state.apiResponse);

        var cliente = this.state.apiResponse[0].email_cl ? true : false;
        
        if(cliente) {
          localStorage.setItem('cliente', true);
          localStorage.setItem('email', this.state.apiResponse[0].email_cl);
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

              <Route exact path="/">
                <HomePage/>
              </Route>
              <Route 
                exact path = '/ErrorPage'
                render = { (props) => (
                  <ErrorPage {...props} 
                />)}
              />
              <Route exact path="/CaseVacanza/">
                <CaseVacanza />
              </Route>
              <Route exact path="/CaseVacanza/:slug">
                <RiepilogoCasaVacanza />
              </Route>
              <Route exact path="/B&B/">
                <BandB />
              </Route>

              <Route 
                exact path = '/Autenticazione'
                render = { (props) => (
                  <Autenticazione {...props}  
                    onChange = {this.onChange}
                    onSubmitLogin = {this.onSubmitLogin}
                    error = {this.state.error}
                    errorMessage = {this.state.errorMessage}
                    successCliente = {this.state.successCliente}
                    successProprietario = {this.state.successProprietario}
                  />)
                }
              />
              <Route 
                exact path = '/secondaAutenticazioneAccedi'
                render = { (props) => (
                  <SecondaAutenticazioneAccedi {...props}
                    onChange = {this.onChange}
                    onSubmitLogin = {this.onSubmitLogin}
                    error = {this.state.error}
                    errorMessage = {this.state.errorMessage}
                  />
                )}
              />
              <Route exact path = '/secondaAutenticazioneRegistrati'>
                <SecondaAutenticazioneRegistrati/>
              </Route>
              <Route exact path = '/secondaAutenticazioneRegistratiCliente'>
                <SecondaAutenticazioneRegistratiCliente />
              </Route>
              <Route exact path= '/secondaAutenticazioneRegistratiProprietario'>
                <SecondaAutenticazioneRegistratiProprietario />
              </Route>

              <Route exact path = "/PaginaCliente">
                <Cliente />
              </Route>
              <Route exact path = '/GestionePrenotazione'>
                <GestionePrenotazione/>
              </Route>

              <Route exact path = '/PaginaProprietario'>
                <ProprietarioPage/>
              </Route>
              <Route exact path="/Testina">
                <Testina />
              </Route>
              <Route exact path = '/Checkin'>
                <Checkin />
              </Route>
              <Route exact path = '/CheckinEffettuato'>
                <CheckinEffettuato />
              </Route>
              <Route exact path = '/InserimentoProprietà'>
                <InserimentoProprietà />
              </Route>
              <Route exact path = '/InserimentoCasaVacanza'>
                <InserimentoCasaVacanza/>
              </Route>
              <Route exact path = '/InserimentoBnB'>
                <InserimentoBnB/>
              </Route>
              <Route exact path="/ElencoBnB2">
                <ElencoBnB2 />
              </Route>
              <Route exact path="/InserimentoStanzaBnB">
                <InserimentoStanzaBnB />
              </Route>
              <Route exact path = '/SceltaModifica'>
                <SceltaModifica/>
              </Route>
              <Route exact path = '/ElencoCasaVacanza'>
                <ElencoCasaVacanza/>
              </Route>
              <Route 
                exact path = '/ModificaCasaVacanza'
                render = { (props) => (
                  <ModificaCasaVacanza {...props}/>
                )}
              />
              <Route 
                exact path = '/SceltaModificaB&B'
                render = { (props) => (
                  <SceltaModificaBeb {...props}/>
                )}
              />
              <Route exact path = '/ElencoB&B'>
                <ElencoBeB/>
              </Route>
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
              <Route exact path = '/DatiPersonali'>
                <DatiPersonali/>
              </Route>
              <Route exact path = '/Earning'>
                <Earning2/>
              </Route>

            </Switch> 

          <Footer/>

          </div>

        </ Router>
      );
  }
}

export default App;
