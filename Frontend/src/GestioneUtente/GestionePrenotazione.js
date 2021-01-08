import React from 'react'
import './GestionePrenotazione.css'
import {Card, Accordion, Button, Form, Col} from 'react-bootstrap'
//import { CardColumn, ListGroup, ListGroupItem } from 'react-bootstrap'
import moment from "moment";
import { SingleDatePicker } from "react-dates";
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
            errorMessage: '',
            empty: false,
            checkInFocus: [],
            checkOutFocus: [],
            startDate: moment(),
            endDate: null
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
            var res = JSON.parse(result);

            if(res.length < 1 || (res.code && res.code === 404)) {
              this.setState({ empty: true, errorMessage: res.message });
            }
      
            else if(this.state.apiResponse.status === 'error') {
              this.setState({ error: true });
              this.setState({ errorMessage: this.state.apiResponse.message });
            }

            else {
                for(var i = 0; i < res.length; i++) {
                    this.setState({
                        checkInFocus: this.state.checkInFocus.concat(null),
                        checkOutFocus: this.state.checkOutFocus.concat(null)
                    })
                }
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

    set_focused_checkIn = (e1, e2) => {

        const list = this.state.checkInFocus.map((item, j) => {
            if (j === e2) {
            return e1;
            } else {
            return !e1;
            }
        });

        this.setState({ checkInFocus: list })
    }

    set_focused_checkOut = (e1, e2) => {

        const list = this.state.checkOutFocus.map((item, j) => {
            if (j === e2) {
            return e1;
            } else {
            return !e1;
            }
        });

        this.setState({ checkOutFocus: list })
    }

    setStartDate = (e) => {
        this.setState({ startDate: e });
    }

    setEndDate = (e) => {
        this.setState({ endDate: e });
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

    onClick = (e) => {
        
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
        else if(this.state.empty) {
            return (
                <div className="containerGP">
                    <div>
                        <h1>Gestisci le tue prenotazioni</h1>
                        <p>Si è verificato un errore: {this.state.errorMessage}</p>
                    </div>
                </div>
            );
        } 
        
        else {
            return (
                <div className="containerGP">
                    <div>
                        <h1>Gestisci le tue prenotazioni</h1>
                        <h5>Le tue prenotazioni: </h5>
                        {        
                            this.state.apiResponse.map(((res, index)=> 
                                <div className="containeracc">
                                    <Accordion>
                                        <Card border="light" id="cardGP">
                                                <div className="headcac">
                                                    <p className="bianco">ID: {res.id_prenotazione}</p>
                                                    <p className="bianco">Partenza: {new Date(res.data_partenza).toLocaleDateString()}</p>
                                                    <p className="bianco">Ritorno: {new Date(res.data_ritorno).toLocaleDateString()}</p>
                                                    <p className="bianco">Stato: {res.accettata === null ? 'In attesa di accettazione' : (res.accettata === 1 ? 'Accettata' : 'Rifiutata')}</p>
                                                    <Accordion.Toggle as={Button} variant="link" eventKey="0" id="accbutt1" onClick = {() => this.set_id(res.id_prenotazione)}>
                                                        Dettagli
                                                    </Accordion.Toggle>
                                                </div>
                                            <Accordion.Collapse eventKey="0">
                                                <Card.Body>
                                                    <div className="infopren">
                                                    <h4>Dettagli struttura </h4>
                                                    <Card className="propcard" id="cardGP">
                                                    <Card.Body>
                                                    <Card.Title><h5>{res.nome_proprieta}</h5></Card.Title>
                                                    <Card.Img src={res.img}/>
                                                    <Card.Text>
                                                    <p className="bianco">Codice struttura: {res.ref_proprieta}, Tipo struttura: {res.tipo_proprieta === 'bb' ? 'B&B' : 'Casa vacanza'}</p>
                                                    <p className="bianco" style = {{display: res.tipo_proprieta === 'bb' ? 'inline' : 'none'}}>Codice stanza: {res.id_stanza}</p>
                                                    <p className="bianco">Località: {res.localita} ({res.provincia}),Indirizzo: {res.indirizzo}</p>
                                                    <p className="bianco">Costo: {res.costo} euro</p>
                                                    <p className="bianco">Soggiornante: {res.nome_sogg} {res.cognome_sogg}</p>
                                                    </Card.Text>
                                                    </Card.Body>
                                                    </Card>
                                                    </div>
                                                    
                                                    <Accordion>
                                                        <div className="acc3">
                                                            <div className="just-cont">
                                                            <Accordion.Toggle as={Button} id="accbutton" variant="link" eventKey="1">Modifica data prenotazione</Accordion.Toggle>
                                                            <Accordion.Toggle as={Button} variant="link" eventKey="2" id="accbutton">Elimina prenotazione</Accordion.Toggle>
                                                            <Accordion.Toggle as={Button} variant="link" eventKey="3" id="accbutton">Contatta il gestore</Accordion.Toggle>
                                                            </div>
                                                            <Accordion.Collapse eventKey="1">
                                                                <div className="changeData">
                                                                <Form>
                                                                    <Form.Row>
                                                                        <Form.Group as={Col} controlId="formGridDate">
                                                                        <div className="bianco">
                                                                            <label class="search-label" htmlFor="start_date">Check-in</label>
                                                                                <div onClick={() => this.set_focused_checkIn(!this.state.checkInFocus[index], index)}>
                                                                                    <SingleDatePicker
                                                                                        class="search-element"
                                                                                        date={this.state.startDate}
                                                                                        onDateChange={date => this.setStartDate(date)}
                                                                                        focused={this.state.checkInFocus[index]}
                                                                                        onFocusChange = {focused => this.onClick(focused)}
                                                                                        id="start_date" 
                                                                                        numberOfMonths={1}
                                                                                        placeholder="gg/mm/aaaa"
                                                                                        daySize={32}
                                                                                        hideKeyboardShortcutsPanel={true}
                                                                                        displayFormat="DD/MM/YYYY"
                                                                                        block={true}
                                                                                        verticalSpacing={8}
                                                                                        showClearDate={this.state.checkInFocus[index]}
                                                                                        reopenPickerOnClearDate={true}
                                                                                        noBorder={true}
                                                                                    />
                                                                                </div>
                                                                        </div>
                                                                        </Form.Group>
                                                                        <Form.Group as={Col} controlId="formGridDate1">
                                                                        <div className="bianco">
                                                                            <label class="search-label" htmlFor="start_date">Check-out</label>
                                                                                <div onClick={() => this.set_focused_checkOut(!this.state.checkOutFocus[index], index)}>
                                                                                    <SingleDatePicker
                                                                                        class="search-element"
                                                                                        date={this.state.endDate}
                                                                                        onDateChange={date => this.setEndDate(date)}
                                                                                        focused={this.state.checkOutFocus[index]}
                                                                                        onFocusChange = {focused => this.onClick(focused)}
                                                                                        id="start_date" 
                                                                                        numberOfMonths={1}
                                                                                        placeholder="gg/mm/aaaa"
                                                                                        daySize={32}
                                                                                        hideKeyboardShortcutsPanel={true}
                                                                                        displayFormat="DD/MM/YYYY"
                                                                                        block={true}
                                                                                        verticalSpacing={8}
                                                                                        showClearDate={this.state.checkOutFocus[index]}
                                                                                        reopenPickerOnClearDate={true}
                                                                                        noBorder={true}
                                                                                    />
                                                                                </div>
                                                                        </div>
                                                                        </Form.Group>
                                                                    </Form.Row>
                                                                </Form>
                                                                <Button id="cambiadata" type="submit">
                                                                Modifica data
                                                                 </Button>
                                                                 </div>
                                                            </Accordion.Collapse>

                                                            <Accordion.Collapse eventKey="2">
                                                                <div>
                                                                    <p className="bianco">Sei sicuro di voler eliminare la tua prenotazione? Non riavrai indietro la caparra.</p>
                                                                    <Button id="annulla1">Conferma</Button>
                                                                    <Button id="annulla2">Annulla</Button>
                                                                </div>
                                                            </Accordion.Collapse>

                                                            <Accordion.Collapse eventKey="3" onClick = {() => this.set_emailProprietario(res.ref_proprietario)}>
                                                                <Form className="formCG">
                                                                    <Form.Row>
                                                                        <Form.Group controlId="formGridContact">
                                                                            <Form.Label className="bianco">Inserisci email</Form.Label>
                                                                            <Form.Control type="email" placeholder="Inserisci tua email" />
                                                                            <Form.Label className="bianco">Inserisci messaggio da inviare al gestore</Form.Label>
                                                                            <Form.Control as="textarea" placeholder="Inserisci testo" />
                                                                            
                                                                        </Form.Group>
                                                                        
                                                                    </Form.Row>
                                                                    <Button id="formCG1">Invia comunicazione</Button>

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