/*CSS FATTO*/ 

import React from "react";
import {Button, Form} from "react-bootstrap"
import {Link} from "react-router-dom"

import "./InserimentoProprietà.css";

import { Redirect } from 'react-router-dom';

class InserimentoStanzaBnB extends React.Component {

  constructor(props) {
    super(props);
    this.state={
        //variabili necessarie
      apiResponse: [],
      error: false,
      errorMessage: '',
      success: false
    };
  }
  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmitInsert = (e) => {
    e.preventDefault();

    const data1 = {
        //variabili
    }
  }
render() {
    return(
        <div className = "background">
        <div className = "containerNew">  
            <div className = "contentNew">
                <form onSubmit = {this.onSubmitInsert}>
                <h2>Compila questo form per inserire le stanze del tuo BnB!</h2>
            
                <label htmlFor = "tipologia">Tipologia di camera</label>
                <Form.Control as="select" className="i" required>
                    <option value="1">Singola</option>
                    <option value="2">Doppia</option>
                    <option value="3">Matrimoniale</option>
                    <option value="4">Doppia Matrimoniale</option>
                    <option value="5">Tripla</option>
                    </Form.Control >
 
                <label htmlFor = "tariffa_stanza">Tariffa stanza BnB</label>
                <input
                  type = "text"
                  id = "tariffa_stanza"
                  name = "tariffa_stanza"
                  placeholder= "Tariffa stanza BnB"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
             
              
                  <label htmlFor = "descrizione">Descrizione</label>
                  <input
                  type = "text"
                  id = "descrizione"
                  name = "descrizione"
                  placeholder = "Descrizione B&B"
                  onChange = {this.onChange}
                  className = "i"
                  required
                />
                <Form.Group>
                        <label>Inserisci delle foto della tua camera</label>
                        <Form.Row className = "justify-content-center">
                        <input
                        type = "file"
                        id = "foto1"
                        name = "foto1SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto1SRC} alt = "Foto 1" ></img>
                        <input
                        type = "file"
                        id = "foto2"
                        name = "foto2SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto2SRC} alt = "Foto 2" ></img>
                        <input
                        type = "file"
                        id = "foto3"
                        name = "foto3SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto3SRC} alt = "Foto 3" ></img>
                        <input
                        type = "file"
                        id = "foto4"
                        name = "foto4SRC"
                        onChange = {this.onChangeFoto}
                        className = "inputImg"
                        accept = "image/*"
                        required
                        />
                        <img src = {this.state.foto4SRC} alt = "Foto 4" ></img>
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
       ); }
    }


export default InserimentoStanzaBnB;