import React, {useState} from 'react'
import './Earning.css'
import {Accordion, Form, Col, Button, Card, CardDeck, Row} from 'react-bootstrap'
import {MdExpandMore} from 'react-icons/md'

import { Redirect } from 'react-router-dom';

class Earning2 extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      email_prop: localStorage.getItem('email'),
      apiResponse: [],
      apiResponse_strutture: [],
      error: false,
      error_message: '',
      data_1: '',
      data_2: '',
      tipo_struttura: '',
      id_struttura: '',
      nome_struttura: ''
    }
  }

  onChange_data_1 = (e) => {
    this.setState({ data_1: e.target.value });
  }

  onChange_data_2 = (e) => {
    this.setState({ data_2: e.target.value });
  }

  onChange_tipo_struttura = (e) => {
    this.setState({ tipo_struttura: e.target.value });
  }

  onChange_nome_struttura = (e) => {
    this.setState({ id_struttura: e.target.value });
  }

  onSubmit_date = (e) => {

    const data = {
      email: this.state.email_prop,
      data_1: this.state.data_1,
      data_2: this.state.data_2
    };

    fetch('http://localhost:9000/getGuadagni/guadagniProprietario', {
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
        });
  }

  onSubmit_tipo_struttura = (e) => {

    const data = {
      email: this.state.email_prop,
      data_1: this.state.data_1,
      data_2: this.state.data_2,
      tipo: this.state.tipo_struttura
    };

    fetch('http://localhost:9000/getGuadagniTipo/guadagniProprietarioTipo', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result) => {
          var a = JSON.parse(result);
          this.setState({ apiResponse: JSON.parse(result) });
      
          if(this.state.apiResponse.status === 'error') {
              this.setState({ error: true });
              this.setState({ errorMessage: this.state.apiResponse.message });
          }
        });
  }

  onSubmit_nome_struttura = (e) => {

    const data = {
      email: this.state.email_prop,
      data_1: this.state.data_1,
      data_2: this.state.data_2,
      id: this.state.id_struttura
    };

    fetch('http://localhost:9000/getGuadagniProprieta/guadagniProprietarioProprieta', {
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
        });
  }

  componentDidMount() {
    const data = {
      ref_proprietario: this.state.email_prop
    };

    fetch('http://localhost:9000/searchProprietaProprietario/proprietaProprietario', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then((result) => result.text())
    .then((result) => {
        this.setState({ apiResponse_strutture: JSON.parse(result) });
    
        if(this.state.apiResponse_strutture.status === 'error') {
            this.setState({ error: true });
            this.setState({ errorMessage: this.state.apiResponse_strutture.message });
        }
    });
  }

  render() {
    if(!localStorage.getItem('logged') || !localStorage.getItem('proprietario')) {
      return <Redirect
          to={{
              pathname: "/ErrorPage",
              state: { 
                  error: true,
                  errorMessage: "Utente non autorizzato" 
              }
          }}
      />
  }
  else if(this.state.error) {
      return <Redirect
          to={{
              pathname: "/ErrorPage",
              state: { 
                  error: true,
                  errorMessage: this.state.errorMessage 
              }
          }}
      />
  }
  else {
    return(
      <div className="paginaEarning">
          <div className ="containerSx">
          <div className="earningDescrizione">
            <h2 className="h2Earning">RESOCONTO GUADAGNI</h2>
            <p>QUI PUOI VEDERE I TUOI GUADAGNI, GRAZIE A TRE FILTRI DIVERSI </p>
          </div>
          <div className="containerEarning">
            <div className="col containerAccordion">
              <Accordion>
                  <div className="earning_head">
                      <p>Filtra i tuoi guadagni in base alla data</p>
                      <Accordion.Toggle as={MdExpandMore} variant="link" eventKey="0" />
                  </div>
                 <Accordion.Collapse eventKey="0">
                     <div className="earning_body">
                      <Form className="formEarning">
                      <Form.Row>
                     <Form.Group as={Col} controlId="formGridDate">
                       <Form.Label>Data di inizio</Form.Label>
                       <Form.Control type="date" placeholder="Inserisci data di inizio" onChange = {this.onChange_data_1} />
                     </Form.Group>
                     <Form.Group as={Col} controlId="formGridDate1">
                     <Form.Label>Data fine</Form.Label>
                       <Form.Control type="date" placeholder="Inserisci data di inizio" onChange = {this.onChange_data_2} />
                     </Form.Group>
                   </Form.Row>
                 </Form>
                      <Button onClick = {this.onSubmit_date} >Visualizza guadagni</Button>
                     </div>
                 </Accordion.Collapse>
                 <div className="earning_head">
                      <p>Filtra i tuoi guadagni in base al tipo di struttura e alla data</p>
                      <Accordion.Toggle as={MdExpandMore} variant="link" eventKey="1" />                       
                  </div>
                  <Accordion.Collapse eventKey="1">
                      <div className="earning_body">
                      <Form className="formEarning">
                   <Form.Row>
                    <Form.Group as={Col} controlId="formGridTypeStruct">
                      <Form.Label>Scegli tipo di struttura</Form.Label>
                      <Form.Control as="select" placeholder="Scegli tipologia" onChange = {this.onChange_tipo_struttura} >
                          <option></option>
                          <option value="bb">Bed And Breakfast</option>
                          <option value="cv">Casa Vacanza</option>
                      </Form.Control>
                    </Form.Group>
                   </Form.Row>
                   <Form.Row>
                     <Form.Group as={Col} controlId="formGridDate">
                       <Form.Label>Data di inizio</Form.Label>
                       <Form.Control type="date" placeholder="Inserisci data di inizio" onChange = {this.onChange_data_1} />
                     </Form.Group>
                     <Form.Group as={Col} controlId="formGridDate1">
                     <Form.Label>Data fine</Form.Label>
                       <Form.Control type="date" placeholder="Inserisci data di inizio" onChange = {this.onChange_data_2} />
                     </Form.Group>
                   </Form.Row>
                 </Form>
                      <Button onClick = {this.onSubmit_tipo_struttura} >Visualizza guadagni</Button>
                      </div>                        
                  </Accordion.Collapse>
                  <div className="earning_head">
                      <p>Filtra i tuoi guadagni in base alla struttura e alla data</p>
                      <Accordion.Toggle as={MdExpandMore} variant="link" eventKey="2" />                       
                  </div>
                <Accordion.Collapse eventKey="2">
                  <div className="earning_body">
                  <Form className="formEarning">
                   <Form.Row>
                    <Form.Group as={Col} controlId="formGridTypeStruct">
                      <Form.Label>Scegli tra le tue strutture</Form.Label>
                      <Form.Control as="select" placeholder="Scegli struttura" onChange = {this.onChange_nome_struttura}>
                      <option></option>
                      {
                        this.state.apiResponse_strutture.map(((res) => 
                          <option value={res.id_proprieta}>{res.id_proprieta}: {res.nome_proprieta}</option>
                        ))
                      }
                      </Form.Control>
                    </Form.Group>
                   </Form.Row>
                   <Form.Row>
                     <Form.Group as={Col} controlId="formGridDate">
                       <Form.Label>Data di inizio</Form.Label>
                       <Form.Control type="date" placeholder="Inserisci data di inizio" onChange = {this.onChange_data_1} />
                     </Form.Group>
                     <Form.Group as={Col} controlId="formGridDate1">
                     <Form.Label>Data fine</Form.Label>
                       <Form.Control type="date" placeholder="Inserisci data di inizio" min="DD/MM/YYYY" onChange = {this.onChange_data_2} />
                     </Form.Group>
                   </Form.Row>
                 </Form>
                 <Button onClick = {this.onSubmit_nome_struttura}>Visualizza guadagni</Button>
                  </div>
                </Accordion.Collapse>
              </Accordion>
            </div>
            </div>
            </div>
            <div className="earningResult">
            <h5>Ecco il resoconto dei tuoi guadagni :</h5>
            <p>Codice truttura selezionata: {this.state.id_struttura} </p>
            <p>Tipo di struttra selezionata: {this.state.tipo_struttura} </p>
            <p>Data selezionata: {new Date(this.state.data_1).toLocaleDateString()} - {new Date(this.state.data_2).toLocaleDateString()} </p>
            <p>Guadagni: &nbsp;
              {typeof this.state.apiResponse[3] !== 'undefined' ? this.state.apiResponse[3][0].tot_guadagni : ""}
              {(typeof this.state.apiResponse[4] !== 'undefined' && typeof this.state.apiResponse[4][0] !== 'undefined') ? this.state.apiResponse[4][0].tot_guadagni : ""} euro
            </p>
          </div>
        </div>
    );
  }
  } 
}
export default Earning2;