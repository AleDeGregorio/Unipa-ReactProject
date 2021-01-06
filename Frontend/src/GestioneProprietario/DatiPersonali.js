import React from 'react'
import { Button, Col, Form, Accordion, Card} from 'react-bootstrap'
import {AiOutlineEdit} from 'react-icons/ai'
import {RiAccountBoxLine} from 'react-icons/ri'
//import { Row } from 'react-bootstrap'
//import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
//import {MdExpandMore} from 'react-icons/md'
//import {Container} from '@material-ui/core'
import './DatiPersonali.css'

import { Redirect } from "react-router-dom";

/*

    ----------  LEGGI QUI:  ----------

    I dati personali che il proprietario può modificare sono:

        password
        documento
        numero di telefono

    ----------------------------------
*/

class DatiPersonali extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            oldPassword: '',
            newPassword: '',
            confirmPassword: '',
            nome: localStorage.getObj('user_data')[0].nome_prop,
            cognome: localStorage.getObj('user_data')[0].cognome_prop,
            nascita: new Date(localStorage.getObj('user_data')[0].data_nascita_prop).toLocaleDateString(),
            num_documento: localStorage.getObj('user_data')[0].num_documento,
            telefono: localStorage.getObj('user_data')[0].telefono_prop,
            email: localStorage.getItem('email'),
            apiResponse: [],
            error: false,
            errorMessage: '',
            show: false, 
            empty: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.newPassword,
            nome: this.state.nome,
            cognome: this.state.cognome,
            nascita: this.state.nascita,
            telefono: this.state.telefono,
            num_documento: this.state.num_documento
        }

        fetch('http://localhost:9000/updateProprietario/fields', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });
            var res = JSON.parse(result);

            if(res.length < 1 || (res.code && res.code === 404)) {
              this.setState({ empty: true, errorMessage: res.message });
            }
      
            else if(this.state.apiResponse.status === 'error') {
              this.setState({ error: true });
              this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                this.setState({ success: true })
            }
        });
    }

    render() {
        if(this.state.success) {
            return (
                <div className = 'Errore'>
                    <h1>Modifiche avvenute con successo!</h1>
                </div>
            );
        }
        else if (this.state.error) {
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
        else if(!localStorage.getItem('logged') || !localStorage.getItem('proprietario') ) {
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
        else if(this.state.empty) {
            var nome = this.state.nome;
            var cognome = this.state.cognome;
            var nascita = this.state.nascita
            var email = this.state.email;
            var telefono = this.state.telefono;
            var num_documento = this.state.num_documento;

            return(
                <Form className="contenitoreDatiPersonali">
                    <div className="DatiPersonali">
                        <h2>Qui puoi modificare i tuoi dati personali!</h2>
                            <Accordion >
                                <p>Si è verificato un errore: {this.state.errorMessage}</p>
                            </Accordion>
                    </div>
                </Form>
                            
                        
            );
        }
        else {
            var nome = this.state.nome;
            var cognome = this.state.cognome;
            var nascita = this.state.nascita
            var email = this.state.email;
            var telefono = this.state.telefono;
            var num_documento = this.state.num_documento;

            return(
                <Form className="contenitoreDatiPersonali" onSubmit = {this.onSubmit}>
                            <div className="DatiPersonali">
                            <h2>Qui puoi modificare i tuoi dati personali!</h2>
                            <Accordion >
                            <Card id="DatiPersonaliCarta1" border="no">
                                 <div className="first-cont">
                                   <div className="datiprofilo">
                                     <p> Nome : {nome} </p>
                                     <p> Cognome :  {cognome}</p>
                                     <p> Email : {email} </p>
                                   </div>
                                   <RiAccountBoxLine className="imgprof" />
                                </div>
                            </Card>
                            <Card id="DatiPersonaliCarta" border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                        <p>Documento: {num_documento}</p>
                                    </div>
                                    <Accordion.Toggle as={AiOutlineEdit} className="penna" variant="link" eventKey="2">
                                    Modifica
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                    <Form.Row>
                                <Form.Group as={Col} controlId="formGridDocument">
                                    <Form.Label>Numero documento</Form.Label>
                                    <Form.Control 
                                        type="document_num" 
                                        defaultValue = {num_documento}
                                        id = "num_documento"
                                        name = "num_documento"
                                        onChange = {this.onChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState" >
                                <Form.Label>Tipo documento</Form.Label>
                                <Form.Control as="select" className="prova" required>
                                    <option></option>
                                    <option>Carta di identità</option>
                                    <option>Patente</option>
                                    <option>Passaporto</option>
                                </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <button type="submit" onClick = {this.onSubmit}>
                                Modifica 
                            </button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card id="DatiPersonaliCarta" border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                        <p>Cambia la tua password</p>
                                    </div>
                                    <Accordion.Toggle as={AiOutlineEdit} className="penna" variant="link" eventKey="3">
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="3"> 
                                    <Card.Body>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Inserisci vecchia Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                title="Almeno 8 caratteri, una lettera maiuscola e un numero" 
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                placeholder="Password" 
                                id = 'oldPassword'
                                name = 'oldPassword'
                                onChange={this.onChange} 
                                required/>
                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Nuova Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                title="Almeno 8 caratteri, una lettera maiuscola e un numero" 
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                placeholder="Password" 
                                id = 'newPassword'
                                name = 'newPassword'
                                onChange={this.onChange} 
                                required/>
                             </Form.Group>
                             <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Ripeti Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                title="Almeno 8 caratteri, una lettera maiuscola e un numero" 
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                placeholder="Password" 
                                id = 'confirmPassword'
                                name = 'confirmPassword'
                                onChange={this.onChange} 
                                required/>
                        </Form.Group>
                                    </Form.Row>
                                    <button type="submit" onClick = {this.onSubmit}>
                                        Modifica password
                                    </button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card id="DatiPersonaliCarta" border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                        <p>Numero di telefono: {telefono}</p>
                                        </div>
                                        <Accordion.Toggle as={AiOutlineEdit} className="penna" variant="link" eventKey="4">
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        <Form.Row>
                                        <Form.Group as={Col} controlId="formGridIndirizzo">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control 
                                type = "tel" 
                                placeholder = "Telefono" 
                                id = 'telefono'
                                name = 'telefono'
                                onChange = {this.onChange} 
                                required
                            />
                        </Form.Group>
                                        </Form.Row>
                                        <button type="submit" onClick = {this.onSubmit}>
                                            Modifica numero
                                        </button>
                                    </Card.Body>

                                </Accordion.Collapse>
                        </Card>
                            </Accordion>
                            </div>
                            </Form>
                            
                        
            );
        }
    }
}
export default DatiPersonali


function BottoneDati () {
    return(
        <button></button>
    )
}