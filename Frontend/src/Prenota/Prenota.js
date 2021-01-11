import React from 'react';
import {Form,Col,Button,Accordion,Card} from 'react-bootstrap'
import './Prenota.css'
import {Redirect} from "react-router-dom";

class Prenota extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            dati_casa: this.props.history.location.state ? this.props.history.location.state.dati_casa : [],
            checkIn: this.props.history.location.state? this.props.history.location.state.checkIn : '',
            checkOut: this.props.history.location.state ? this.props.history.location.state.checkOut : '',
            posti: this.props.history.location.state ? this.props.history.location.state.posti : 1,
            partenza: '',
            ritorno: ''
        }
    }

    componentDidMount() {
        if(this.state.checkIn !== '' && this.state.checkOut !== '') {
            var str1 = this.state.checkIn;
            var dmy1 = str1.split("/");
            var date1 = new Date(dmy1[2], dmy1[1] - 1, dmy1[0]);
            var offset1 = date1.getTimezoneOffset();
            date1 = new Date(date1.getTime() - (offset1*60*1000));

            var str2 = this.state.checkOut;
            var dmy2 = str2.split("/");
            var date2 = new Date(dmy2[2], dmy2[1] - 1, dmy2[0]);
            var offset2 = date2.getTimezoneOffset();
            date2 = new Date(date2.getTime() - (offset2*60*1000));

            this.setState({ 
                partenza: date1.toISOString().slice(0,10),
                ritorno: date2.toISOString().slice(0,10)
            });
        }
    }
    
    render(){
        if(!localStorage.getItem('logged')) {
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

        return(
            <div className="prenota-cont">
                <div className="prenota-sx-cont">
                    <h3>Conferma la tua prenotazione</h3>
                    <div className="infoviaggio">
                    <h5>Info viaggio</h5>
                    <Accordion>
                        <div className="headaccpren">
                            <p>Date:</p>
                            <Accordion.Toggle  eventKey="0" id="modifica">
                                Visualizza
                            </Accordion.Toggle>
                        </div>
                            <Accordion.Collapse eventKey="0">
                                <div>
                            <Form id="prenotaForm">
                                <Form.Row>
                                    <Form.Group as={Col} controlId="formGridDate">
                                        <Form.Label>Check-In</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            placeholder="Inserisci data di inizio" 
                                            id = 'data_partenza'
                                            name = 'data_partenza'
                                            value = {this.state.partenza}
                                            disabled = "true"
                                        />
                                    </Form.Group>
                                    <Form.Group as={Col} controlId="formGridDate1">
                                        <Form.Label>Check-Out</Form.Label>
                                        <Form.Control 
                                            type="date" 
                                            placeholder="Inserisci data di fine" 
                                            id = 'data_ritorno'
                                            name = 'data_ritorno'
                                            value = {this.state.ritorno}
                                            disabled = "true"
                                        />
                                    </Form.Group>
                                </Form.Row>
                            </Form>
                                </div>
                            </Accordion.Collapse>
                        <div className="headaccpren">
                            <p>Numero ospiti: </p>
                            <Accordion.Toggle eventKey="1" id="modifica">
                                Visualizza
                            </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="1">
                        <Form id="prenotaFormOspiti">
                        <Form.Group as={Col} controlId="formGridDate">
                        <Form.Label>Ospiti</Form.Label>
                        <Form.Control 
                            type="input" 
                            value = {this.state.posti}
                            disabled = "true"
                        />
                        </Form.Group>
                        </Form>
                        </Accordion.Collapse>
                    </Accordion>
                        <div>
                            <h4>Scegli come pagare</h4>
                            <div className="containerPaga">
                                    <div className="paga">
                                        <h5>Paga per intero</h5>
                                        <div className="row-flex">
                                            <Form.Check inline label="Paga adesso" type="radio" id="now" />
                                        </div>
                                    </div>
                                    <div className="paga">
                                        <h5>Paga una parte</h5>
                                        <div className="row-flex">
                                        <Form.Check inline label="Paga dopo" type="radio" id="later"/>
                                        </div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Simulazione pagamento </h3>
                    </div>   
                    <div>
                        <h3>Hai dei bisogni particolari? Contatta il gestore!</h3>
                    </div> 
                    <button className="bottonePrenota">Prenota</button>    
                </div>
                <div className="prenota-dx-cont">
                    <Card id="cartaInfo">
                        <Card.Body>
                            <p>INFO PRENOTAZIONE!</p>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}
export default Prenota;