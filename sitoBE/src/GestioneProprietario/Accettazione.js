import React from 'react'
import {ListGroup, Table, Button, ButtonGroup, Accordion, Card} from 'react-bootstrap'
import './Accettazione.css'

export default function Accettazione(){
    return(
            <div>
                <h1>Ecco le prenotazioni da accettare</h1>
                <Accordion>
                    <div className="testa_accordo">
                    <p>ID</p>
                    <p>Cliente</p>
                    <p>Tempo rimanente</p>
                    <p>Struttura</p>
                    <p>Visualizza dettagli</p>
                    </div>
                    <div className="testa_accordo">
                    <p>123</p>
                    <p>Giorgio Lucia</p>
                    <p> 5 minuti</p>
                    <p> Casa di alfio</p>
                    <Accordion.Toggle as={Button} variant="link" eventKey="0">visualizza dettagli</Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="0">
                        <div className="corpo_accordo">
                            <p>Num soggiornanti ecc</p>    
                        </div>                     
                    </Accordion.Collapse>
                    <div className="testa_accordo">
                    <p>1234</p>
                    <p>Giorgio Torton</p>
                    <p> 5 ore</p>
                    <p> Casa di Mana</p>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">visualizza dettagli</Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="1">
                        <div className="corpo_accordo">
                            <p>Num soggiornanti ecc</p>    
                        </div>                     
                    </Accordion.Collapse>
                    <div className="testa_accordo">
                    <p>12345</p>
                    <p>Giorgio Lucia</p>
                    <p> 5 minuti</p>
                    <p> Casa di alfio</p>
                    <Accordion.Toggle as={Button} variant="link" eventKey="2">visualizza dettagli</Accordion.Toggle>
                    </div>
                    <Accordion.Collapse eventKey="2">
                        <div className="corpo_accordo">
                            <p>Num soggiornanti ecc</p>    
                        </div>                     
                    </Accordion.Collapse>
               </Accordion>

            <h1>Ecco le prenotazioni accettate</h1>
            <Table>
                <thead>
                <tr>
                    <th>ID </th>
                    <th>Cliente</th>
                    <th>Durata soggiorno</th>
                    <th>Struttura</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                        <th>ID</th>
                        <th>Peppe tetto</th>
                        <th>15gg</th>
                        <th>Casa mia </th>
                    </tr>
                </tbody>

            </Table>
            </div>

    );
}