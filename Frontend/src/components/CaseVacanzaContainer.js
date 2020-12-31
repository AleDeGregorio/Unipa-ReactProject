import React from "react";
//import { withCasaVacanzaConsumer } from "../CasaVacanza/context"
//import Loading from "./Loading";
import CaseVacanzaFilter from './CaseVacanzaFiltro';
import CaseVacanzaList from "./CaseVacanzaLista";

import './CaseVacanzaLista.css'

import { Redirect } from "react-router-dom";

class CasaVacanzaContainer extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      case: this.props.case ? this.props.case : [],
      posti: this.props.posti ? this.props.posti : 1,
      datiRicerca: '',
      apiResponse: [],
      error: false,
      errorMessage: ''
    }
  }

  componentDidMount() {

    fetch('http://localhost:9000/servizi/all', {
      method: "GET",
      headers: {
        'Content-type': 'application/json'
      }
    })
    .then((result) => result.text())
    .then((result) => {
        this.setState({ apiResponse: JSON.parse(result) });
    
        if(this.state.apiResponse.status === 'error') {
            this.setState({ error: true });
            this.setState({ errorMessage: this.state.apiResponse_strutture.message });
        }
    });
  }

  onChange = (e) => {
    this.setState({ 
      posti: e.posti,
      datiRicerca: e
    });

    const data = {
      tipo: 'cv',
      localita: this.state.datiRicerca.localita ? this.state.datiRicerca.localita : '',
      provincia: '',
      servizi: '',
      posti: this.state.datiRicerca.posti ? this.state.datiRicerca.posti : 1,
      tariffa: this.state.datiRicerca.tariffa ? this.state.datiRicerca.tariffa : '',
      checkIn: '',
      checkOut: ''
    };

  fetch('http://localhost:9000/ricercaAlloggio/risultati', {
      method: "POST",
      headers: {
          'Content-type': 'application/json'
      },
      body: JSON.stringify(data)
  })
  .then((result) => result.text())
  .then((result) => {
      console.log(JSON.parse(result));
      this.setState({ case: JSON.parse(result) });

      if(this.state.case.status === 'error') {
          this.setState({ error: true });
          this.setState({ errorMessage: this.state.case.message });
      }
    });
  }

  render() {
    if (this.state.error) {
      return <Redirect 
      to = {{
        pathname: "/ErrorPage",
        state: {
          error: true,
          errorMessage: this.state.errorMessage
        }
      }}
    />
  }
    return (
      <>
        <CaseVacanzaFilter servizi={this.state.apiResponse} posti = {this.props.posti} onChange = {this.onChange} />
        <div className="ListaProp">
          <CaseVacanzaList case={this.state.case} />
        </div>
      </>
    );
  }
}

/*function CasaVacanzaContainer({ context }) {
  const { loading, sortedCaseVacanza, caseVacanza } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <>
      <CaseVacanzaFilter casaVacanza={caseVacanza} />
      <div className="ListaProp">
      <CaseVacanzaList caseVacanza={sortedCaseVacanza} />
      </div>
    </>
  );
}

export default withCasaVacanzaConsumer(CasaVacanzaContainer);*/

export default CasaVacanzaContainer;