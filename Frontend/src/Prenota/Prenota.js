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
                            <Accordion.Toggle as={Button} eventKey="0">
                                Modifica
                            </Accordion.Toggle>
                        </div>
                            <Accordion.Collapse eventKey="0">
                                <p>QUA CI METTIAMO IL COSO X CAMBIARE DATA</p>
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
                                <div>
                                    <h5>Paga per intero</h5>
                                    <p>Paga subito o ti sfascio</p>
                                    <input type="radio" />
                                </div>
                                <div>
                                    <h5>Paga metà ora metà dopo</h5>
                                    <p>Cumpa paghi chiu picca uara</p>
                                    <input type="radio" />
                                </div>
                        </div>
                    </div>
                    
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