import React from 'react'
import { Button, Col, Form, Row} from 'react-bootstrap'
import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
import {MdExpandMore} from 'react-icons/md'
import {Container} from '@material-ui/core'
import './DatiPersonali.css'

function DatiPersonali (){
    return(
      <div className="containerGGA">
        <div className="topview">
          <h1>Modifica Dati account</h1>
        </div>
        <div className="containerGA">
        <div className="containerSGA">
          <h3>Ecco i dati attuali del tuo account</h3>
          <p>Nome : </p>
          <p>Cognome : </p>
          <p>Email : </p>
          <p>Data di nascita : </p>
          <p>Numero di telefono</p>
        </div>
        <div className="containerDGA">
          <div className="modificaNome">
             <Form.Row>
                <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Nuovo nome</Form.Label>
                <Form.Control type="name" placeholder="Inserire nome cliente" />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Nuovo cognome</Form.Label>
                <Form.Control type="surname" placeholder="Inserire cognome cliente" />
                </Form.Group>
              </Form.Row>
              <Button>Modifica Nome</Button>
            </div>
            <div className="modificaPassword">
            <Form.Row>
              <Form.Group as={Col} controlId="formPsw">
                <Form.Label>Vecchia password</Form.Label>
                <Form.Control type="password" placeholder="Inserisci vecchia password" />
                <Form.Label>Nuova password</Form.Label>
                <Form.Control type="password" aria-describedby="passwordHelpBlock" placeholder="Inserisci nuova password" />
                <Form.Text id="passwordHelpBlock" muted>
    Your password must be 8-20 characters long, contain letters and numbers, and
    must not contain spaces, special characters, or emoji.
  </Form.Text>
                <Form.Label>Conferma nuova password</Form.Label>
                <Form.Control type="password" placeholder="Conferma nuova password" />
              </Form.Group>
            </Form.Row>
            <Button>Modifica password</Button>
            </div>
            <div className="modificaDN">
              <Form.Label>Cambia data di nascita</Form.Label>
              <Form.Control type="date" />
              <Button>Modifica data di nascita</Button>
            </div>
            <div className="modificaTel">
              <Form.Label>Inserisci nuovo numero di telefono</Form.Label>
              <Form.Control type="integer" placeholder="inserisci num tel"/>
              <Button>Modifica numero di telefono</Button>
            </div>
        </div>
      </div>
      </div>

    );
}
export default DatiPersonali
