import React from 'react'
import {Card, CardDeck, Form, Jumbotron, Button} from 'react-bootstrap'
import './DiventaHost.css'

function DiventaHost(){
        return(
            <div className="containerDH">
                <div className="top">
                <div className="containerFormDH">
                    
                    <h4>Inserisci i dati mancanti e inizia a registrare la tua prima struttura!</h4>
                        <Form className="formDH">
                            <Form.Group controlId="formBasicDocument">
                                <Form.Label className="colorLabel">Scegli tipo di documento</Form.Label>
                                <Form.Control as="select" id="form-select" placeholder="Scegli documento">
                                    <option></option>
                                    <option>Carta d'identità</option>
                                    <option>Tessera sanitaria</option>
                                    <option>Passaporto</option>
                                    <option>Patente</option>
                                </Form.Control>
                                <Form.Label className="colorLabel">Inserisci foto documento</Form.Label>
                                <Form.File id="form-select1"/>
                            </Form.Group>
                            <Button id="dhbutton">Diventa un Host</Button>
                        </Form>
                        
                </div>
                <div className="jumbo">
                    <Jumbotron id="jumbo">
                    <h4>Pronto a diventare un Host?</h4>
                    <p>Noi ci prendiamo cura dei nostri  host, abbiamo tanti vantaggi per voi! </p>
                    <p>Vedi le strutture aggiunte da terzi</p>
                    <Button id="dhbutton">Vai alle strutture!</Button>
                    </Jumbotron>
                </div>
                </div>
                <div className="containerFormSV">
                    <h4>Scopri i vantaggi di essere un Host</h4>
                    <CardDeck>
                        <Card className="cdh" id="cdh1">
                            <Card.Title>Inserisci e modifica le tue strutture</Card.Title>
                            <Card.Body>
                                Bastano 5 minuti per inserire i dati relativi e le tue strutture saranno subito pubblicizzate, non dovrai preoccuparti di nulla!
                            </Card.Body>
                        </Card>
                        <Card className="cdh" id="cdh1">
                        <Card.Title>Gestisci le prenotazioni</Card.Title>
                        <Card.Body>
                            Tramite un'interfaccia molto intuitiva potrai vedere subito le richieste da parte degli utenti, scegliere se accettare o rifiutarle, e gestire le prenotazioni già accettate con relativo Check-in.
                        </Card.Body>
                        </Card>
                        <Card className="cdh" id="cdh1">
                            <Card.Title>Sarai sempre al corrente dei tuoi guadagni</Card.Title>
                            <Card.Body>
                                Abbiamo pensato tre metodologie diverse per mettervi al corrente dei vostri guadagni, entra e scoprile!
                            </Card.Body>
                        </Card>
                        <Card className="cdh"id="cdh1">
                            <Card.Title>Comunicazione automatizzata</Card.Title>
                            <Card.Body>Inviare dati agli uffici competenti? Adesso basta un click!</Card.Body>
                        </Card>
                    </CardDeck>
                </div>
            </div>

    );
}
export default DiventaHost;