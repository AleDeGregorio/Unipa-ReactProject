import React from 'react'
import './GestionePrenotazione.css'
import {Card, Accordion, Button, Form, Col} from 'react-bootstrap'
//import { CardColumn, ListGroup, ListGroupItem } from 'react-bootstrap'

import { Redirect } from 'react-router-dom'

class GestionePrenotazione extends React.Component {
    constructor(props) {     //props : stati delle componenti parent
        super(props);
        this.state = {
            id_prenotazione: '',
            data_partenza: '',
            data_ritorno: '',
            ref_proprietario: '',
            email: localStorage.getItem('email'),  //variabili di cui abbiamo bisogno
            apiResponse: [] ,
            error: false,
            errorMessage: ''
        }
    }

    componentDidMount() { //interrogazione che viene effettuata all'apertura della pagina
        const data = {
            ref_cliente: this.state.email
        }; //body richiesta http (in questo caso chiave primaria cioè ref_cliente)

        fetch('http://localhost:9000/searchPrenotazioneCliente/prenotazioneCliente', { //metodo http in fetch
            method:'POST',
            headers:{
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result)=> result.text())                  //risultato interrogazione 
        .then((result)=> {
            this.setState({ apiResponse:JSON.parse(result) }); //rende array il risultato

            if(this.state.apiResponse.status==='error') {       //gestione errori
                this.setState({
                    error:true, 
                    errorMessage:'this.state.apiResponse.message'
                });
            }
        })
   }

   onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    set_id = (e) => {
        this.setState({ id_prenotazione: e })
    }

    set_emailProprietario = (e) => {
        this.setState({ ref_proprietario: e })
    }

    onSubmitModifica = (e) => {
        e.preventDefault();

        const data = {
            id_prenotazione: this.state.id_prenotazione,
            data_partenza: this.state.data_partenza,
            data_ritorno: this.state.data_ritorno
        }

        fetch('http://localhost:9000/updateDatePrenotazione/newDate', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });

            if(this.state.apiResponse.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                this.setState({ success: true })
            }
        });
    }

    onSubmitElimina = (e) => {
        e.preventDefault();

        const data = {
            id_prenotazione: this.state.id_prenotazione,
        }

        fetch('http://localhost:9000/deletePrenotazione/delete', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });

            if(this.state.apiResponse.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                this.setState({ success: true })
            }
        });
    }

    render() {
        if(!localStorage.getItem('logged') || !localStorage.getItem('cliente')) {
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
            return (
                <div className="containerGP">
                    <div>
                        <h1>Gestisci le tue prenotazioni</h1>
                        <h5>Le tue prenotazioni: </h5>
                        {        
                            this.state.apiResponse.map(((res)=>
                                <div className="containeracc">
                                    <Accordion>
                                        <Card border="light">
                                                <div className="headcac">
                                                    <p>ID: {res.id_prenotazione}</p>
                                                    <p>Partenza: {new Date(res.data_partenza).toLocaleDateString()}</p>
                                                    <p>Ritorno: {new Date(res.data_ritorno).toLocaleDateString()}</p>
                                                    <p>Stato: {res.accettata ? 'Accettata' : 'In attesa di accettazione'}</p>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" onClick = {() => this.set_id(res.id_prenotazione)}>
                                                        Dettagli
                                                    </Accordion.Toggle>
                                                </div>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <h4>Dettagli struttura </h4>
                                                    <Card className="propcard">
                                                    <Card.Body>
                                                    <Card.Title>{res.nome_proprieta}</Card.Title>
                                                    <Card.Img src={res.img}/>
                                                    <Card.Text>
                                                    <p>Codice struttura: {res.ref_proprieta}, Tipo struttura: {res.tipo_proprieta === 'bb' ? 'B&B' : 'Casa vacanza'}</p>
                                                    <p style = {{display: res.tipo_proprieta === 'bb' ? 'inline' : 'none'}}>Codice stanza: {res.id_stanza}</p>
                                                    <p>Località: {res.localita} ({res.provincia}),Indirizzo: {res.indirizzo}</p>
                                                    <p>Costo: {res.costo} euro</p>
                                                    <p>Soggiornante: {res.nome_sogg} {res.cognome_sogg}</p>
                                                    </Card.Text>
                                                    </Card.Body>
                                                    </Card>
                                                   
                                                    
                                                    <Accordion>
                                                        <div className="acc3">
                                                            <Accordion.Toggle as={Button} onClick={this.nomeFunzione} variant="link" eventKey="1">Modifica data prenotazione</Accordion.Toggle>
                                                            <Accordion.Toggle as={Button} variant="link" eventKey="2">Elimina prenotazione</Accordion.Toggle>
                                                            <Accordion.Toggle as={Button} variant="link" eventKey="3">Contatta il gestore</Accordion.Toggle>

                                                            <Accordion.Collapse eventKey="1">
                                                                <div className="tisfunnu">
                                                                <Form>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} controlId="formGridDate">
                                                                            <Form.Label>Data di inizio</Form.Label>
                                                                            <Form.Control 
                                                                                type="date" 
                                                                                placeholder="Inserisci data di inizio" 
                                                                                id = 'data_partenza'
                                                                                name = 'data_partenza'
                                                                                onChange = {this.onChange}
                                                                            />
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} controlId="formGridDate1">
                                                                            <Form.Label>Data fine</Form.Label>
                                                                            <Form.Control 
                                                                                type="date" 
                                                                                placeholder="Inserisci data di fine" 
                                                                                id = 'data_ritorno'
                                                                                name = 'data_ritorno'
                                                                                onChange = {this.onChange}
                                                                            />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Form>
                                                                <Button variant="primary" type="submit">
                                                                Modifica data
                                                                 </Button>
                                                                 </div>
                                                            </Accordion.Collapse>

                                                            <Accordion.Collapse eventKey="2">
                                                                <div>
                                                                    <p>Sei sicuro di voler eliminare la tua prenotazione? Non riavrai indietro la caparra.</p>
                                                                    <Button>Conferma</Button>
                                                                    <Button>Annulla</Button>
                                                                </div>
                                                            </Accordion.Collapse>

                                                            <Accordion.Collapse eventKey="3" onClick = {() => this.set_emailProprietario(res.ref_proprietario)}>
                                                                <Form>
                                                                    <Form.Row>
                                                                        <Form.Group controlId="formGridContact">
                                                                            <Form.Label>Inserisci email</Form.Label>
                                                                            <Form.Control type="email" placeholder="Inserisci tua email" />
                                                                            <Form.Label>Inserisci messaggio da inviare al gestore</Form.Label>
                                                                            <Form.Control as="textarea" placeholder="Inserisci testo" />
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                    <Button>Invia comunicazione</Button>
                                                                </Form>
                                                            </Accordion.Collapse>
                                                        </div>
                                                    </Accordion>
                                                </Card.Body>
                                            </Accordion.Collapse>
                                        </Card>
                                    </Accordion>
                                </div>
                            )) 
                        }   
                    </div>
                </div>
            );
        }
    }
}
export default GestionePrenotazione;