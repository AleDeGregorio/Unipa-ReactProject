import React, {useState} from 'react'
import './Earning.css'
import {Accordion, Form, Col, Button, Card, CardDeck, Row} from 'react-bootstrap'
import {MdExpandMore} from 'react-icons/md'
function Earning2(){
    return(
        <div className="paginaEarning">
            <div className ="containerSx">
            <div className="earningDescrizione">
              <h3>resoconto guadagni</h3>
              <p>qui puoi vedere i tuoi guadagni, abbiamo pensato per te tre tipi di filtri diversi </p>
            </div>
            <div className="containerEarning">
              <div className="containerAccordion">
                <Accordion>
                    <div className="earning_head">
                        <p>Filtra i tuoi guadagni in base alla data</p>
                        <Accordion.Toggle as={MdExpandMore} variant="link" eventKey="0" />
                    </div>
                   <Accordion.Collapse eventKey="0">
                       <div className="earning_body">
                        <Form className="formEarning">
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
                        <Button>Visualizza guadagni</Button>
                       </div>
                   </Accordion.Collapse>
                   <div className="earning_head">
                        <p>Filtra i tuoi guadagni in base al tipo di struttura e alla data</p>
                        <Accordion.Toggle as={MdExpandMore} variant="link" eventKey="1" />                       
                    </div>
                    <Accordion.Collapse eventKey="1">
                        <div className="earning_body">
                        <Form className="formEarning">
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
                        <Button>Visualizza guadagni</Button>
                        </div>                        
                    </Accordion.Collapse>
                    <div className="earning_head">
                        <p>Filtra i tuoi guadagni in base alla struttura e alla data</p>
                        <Accordion.Toggle as={MdExpandMore} variant="link" eventKey="2" />                       
                    </div>
                  <Accordion.Collapse eventKey="2">
                    <div className="earning_body">
                    <Form className="formEarning">
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
                   </Form>
                   <Button>Visualizza guadagni</Button>
                    </div>
                  </Accordion.Collapse>
                </Accordion>
              </div>
              </div>
            <div className="earningResult">
              <h5>Risultati :</h5>
              <p>Struttura selezionata :</p>
              <p>Tipo di struttra selezionata</p>
              <p>Data selezionata: </p>
              <p>Guadagni: </p>
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
              </div>
          </div>
        
        );
}
export default Earning2;