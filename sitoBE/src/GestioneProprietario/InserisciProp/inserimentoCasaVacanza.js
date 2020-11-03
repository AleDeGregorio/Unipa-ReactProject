/*CSS FATTO*/

import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

import "./InserimentoProprietà.css";


class InserimentoCasaVacanza extends React.Component {
  constructor(){
    super();
    this.state={
      nome_proprieta: '',
      indirizzo: '',
      localita:'',
      provincia:'',
      tipo_proprieta:'cv',
      servizi:'',
      descrizione:'',
      ref_proprietario:localStorage.getItem('email_prop'),
      postiletto:'',
      tariffa:'',
      apiResponse: [],
      error: false,
      errorMessage: ''
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmitInsert = (e) => {
    e.preventDefault();
    const data1= {
      nome_proprieta: this.state.nome_proprieta,
      indirizzo: this.state.indirizzo,
      localita:this.state.localita,
      provincia:this.state.provincia,
      tipo_proprieta:'cv',
      servizi:this.state.servizi,
      ref_proprietario:localStorage.getItem('email_prop'),
      descrizione:this.state.descrizione
    }
    const data2 = {
      ref_proprieta_cv:localStorage.getItem('id_proprieta'),
      postiletto:this.state.postiletto,
      tariffa:this.state.tariffa
    };

    fetch('http://localhost:9000/insertProprieta/new',{
      method: "POST",
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify(data1)
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
        //inserire messaggio inserimento avvenuto
      }
    });
      fetch('http//localhost:9000/insertCV/new',{
        method: "POST",
        headers:{
          'Content-type': 'application/json'
        },
        body: JSON.stringify(data2)
      })
      .then((result) => result.text())
      .then((result) => {
        console.log(JSON.parse(result));
        this.setState({ apiResponse: JSON.parse(result) });
      })
  }
render(){
  return (
    <div className="background">
        <div className="containerNew">  
            <div className="contentNew">
                <form onSubmit={this.props.onSubmitLogin}>
                <h2>Compila questo form inserire la tua casa vacanza!</h2>
                <label htmlFor="Nome">Nome</label>
          <input
            type="text"
            id="Nome"
            placeholder="Nome casa"
            onChange={this.props.onChange}
            className="i"
          />

          <label htmlFor="Città">Città</label>
          <input
            type="text"
            id="Città"
            placeholder="Nome città"
            onChange={this.props.onChange}
            className="i"
          />

          <label htmlFor="Via">Via</label>
          <input
            type="text"
            id="Via"
            placeholder="Indirizzo casa"
            onChange={this.props.onChange}
            className="i"
          />
           
           <label htmlFor="Provincia">Provincia</label>
          <input
            type="text"
            id="Provincia"
            placeholder="Provincia casa"
            onChange={this.props.onChange}
            className="i"
          />

           <label htmlFor="Servizi">Servizi</label>
          <input
            type="text"
            id="Servizi"
            placeholder="Elenco servizi"
            onChange={this.props.onChange}
            className="i"
          />
              <label htmlFor="Descrizione">Descrizione</label>
          <input
            type="text"
            id="Descrizione"
            placeholder="Descrizione casa"
            onChange={this.props.onChange}
            className="i"
          />
                <label htmlFor="Nome">Tariffa</label>
                <input
                    type="text"
                    id="Tariffa"
                    placeholder="Tariffa casa"
                    className="i"
                />
                <Form.Group>
                    <label>Inserisci delle foto della tua struttura</label>
                    <Form.Row className="justify-content-center">
                    <input
                    type="file"
                    className="inputImg"
                    accept="image/*"
                    />
                    <input
                    type="file"
                    className="inputImg"
                    accept="image/*"
                    />
                    <input
                    type="file"
                    className="inputImg"
                    accept="image/*"
                    />
                    <input
                    type="file"
                    className="inputImg"
                    accept="image/*"
                    />
                </Form.Row>
                </Form.Group>
                <Link to="/InserimentoProprietà">Torna indietro</Link>
                <Button variant="primary" type="submit">
                    Carica
                </Button>
                </form>
            </div>
        </div>
    </div>
 );}
};

export default InserimentoCasaVacanza;