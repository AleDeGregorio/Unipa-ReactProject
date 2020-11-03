//CSS COMPLETATO

import React, {useState} from 'react'
import './Earning.css'
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {Form, Col, Button, Card, CardDeck, Row} from 'react-bootstrap'



function Earning(){
        return(
          <div className="paginaEarning">
            <div className ="containerSx">
            <div className="earningDescrizione">
              <h3>resoconto guadagni</h3>
              <p>qui puoi vedere i tuoi guadagni, abbiamo pensato per te tanti tipi di filtri diversi </p>
              <p>1) filtra in base alla data</p>
              <p>2) filtra in base al tipo di struttura e alla data</p>
              <p>3) filtra in base alle strutture e alla data </p>
            </div>
            <div className="containerEarning">
              <div className="containerAccordion">
                <Accordion className="accordion">
                  <AccordionSummary>Form numero 1</AccordionSummary>
                  <AccordionDetails>
                   <Form className="formEarning">
                     <h1>Filtra i tuoi guadagni in base alla data</h1>
                     <Form.Row>
                       <Form.Group as={Col} controlId="formGridDate">
                         <Form.Label>Data di inizio</Form.Label>
                         <Form.Control type="date" placeholder="Inserisci data di inizio" />
                       </Form.Group>
                       <Form.Group as={Col} controlId="formGridDate1">
                       <Form.Label>Data fine</Form.Label>
                         <Form.Control type="date" placeholder="Inserisci data di inizio" />
                       </Form.Group>
                     </Form.Row>
                   </Form>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>Form numero 2</AccordionSummary>
                  <AccordionDetails>
                  <Form className="formEarning">
                     <h1>Filtra i tuoi guadagni in base alla data</h1>
                     <Form.Row>
                      <Form.Group as={Col} controlId="formGridTypeStruct">
                        <Form.Label>Scegli tipo di struttura</Form.Label>
                        <Form.Control as="select" placeholder="Scegli tipologia">
                            <option></option>
                            <option value="bnb">Bed And Breakfast</option>
                            <option value="cs">Casa Vacanza</option>
                        </Form.Control>
                      </Form.Group>
                     </Form.Row>
                     <Form.Row>
                       <Form.Group as={Col} controlId="formGridDate">
                         <Form.Label>Data di inizio</Form.Label>
                         <Form.Control type="date" placeholder="Inserisci data di inizio" />
                       </Form.Group>
                       <Form.Group as={Col} controlId="formGridDate1">
                       <Form.Label>Data fine</Form.Label>
                         <Form.Control type="date" placeholder="Inserisci data di inizio" />
                       </Form.Group>
                     </Form.Row>
                   </Form>
                  </AccordionDetails>
                </Accordion>
                <Accordion>
                  <AccordionSummary>Form numero 3</AccordionSummary>
                  <AccordionDetails><Form className="formEarning">
                     <h1>Filtra i tuoi guadagni in base alla data</h1>
                     <Form.Row>
                      <Form.Group as={Col} controlId="formGridTypeStruct">
                        <Form.Label>Scegli tra le tue strutture</Form.Label>
                        <Form.Control as="select" placeholder="Scegli tipologia">
                            <option></option>
                            <option value="bnb">Bed And Breakfast</option>
                            <option value="cs">Casa Vacanza</option>
                        </Form.Control>
                      </Form.Group>
                     </Form.Row>
                     <Form.Row>
                       <Form.Group as={Col} controlId="formGridDate">
                         <Form.Label>Data di inizio</Form.Label>
                         <Form.Control type="date" placeholder="Inserisci data di inizio" />
                       </Form.Group>
                       <Form.Group as={Col} controlId="formGridDate1">
                       <Form.Label>Data fine</Form.Label>
                         <Form.Control type="date" placeholder="Inserisci data di inizio" />
                       </Form.Group>
                     </Form.Row>
                   </Form></AccordionDetails>
                </Accordion>
              </div>
            </div>
            </div>
            <div className="containerDx">
                <div className="propStruct">
                  <h5>Ecco le tue strutture registrate</h5>
                  <CardDeck>
                  <Card className="cardEarning">
                    <Card.Title>inserire card</Card.Title>
                  </Card>
                  </CardDeck>
                </div>
                <div className="earningResult">
                  /*qui visualizzi i guadagni*/
                </div>
              </div>
          </div>
        );
}
export default Earning;

