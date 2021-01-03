import React from 'react';
import {Form,Col,Button,Accordion,Card} from 'react-bootstrap'
import './Prenota.css'
import {Reirect} from "react-router-dom";

class Prenota extends React.Component {
    
    render(){
        return(
            <div className="prenota-cont">
                <div className="prenota-sx-cont">
                    <h3>Conferma la tua prenotazione</h3>
                    <div className="infoviaggio">
                    <h5>Info viaggio</h5>
                    <Accordion>
                        <div className="headaccpren">
                            <p>Data :</p>
                            <p>Visualizza data</p>
                            <Accordion.Toggle  eventKey="0">
                                Modifica
                            </Accordion.Toggle>
                        </div>
                            <Accordion.Collapse eventKey="0">
                                <div>
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
                        <div className="headaccpren">
                            <p>Ospiti : </p>
                            <Accordion.Toggle eventKey="1">
                                Modifica
                            </Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="1">
                            <p>Cambiare ospiti</p>
                        </Accordion.Collapse>
                        <div className="headaccpren">
                            <p>Altre relative modifiche</p>
                            <Accordion.Toggle eventKey="2">Modifica</Accordion.Toggle>
                        </div>
                        <Accordion.Collapse eventKey="2">
                            <p>Altre robe di modifica</p>
                        </Accordion.Collapse>
                    </Accordion>

                        <div>
                            <h4>Scegli come pagare</h4>
                            <div className="row-flex">
                            <Form>
                                <div>
                                    <h5>Paga per intero</h5>
                                    <div className="row-flex">
                                        <Form.Check inline label="Paga adesso" type="radio" id="now" checked />
                                    </div>
                                </div>
                                <div>
                                    <h5>Paga una parte</h5>
                                    <div className="row-flex">
                                    <Form.Check inline label="Paga dopo" type="radio" id="later" checked/>
                                    </div>
                                </div>
                                </Form>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h3>Simulazione pagamento </h3>
                    </div>   
                    <div>
                        <h3>Hai dei bisogni particolari? Contatta il gestore!</h3>
                    </div> 
                    <button>Prenota</button>    
                </div>
                <div className="prenota-dx-cont">
                    <Card>
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