import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './secondaAutenticazione.css'

function SecondaAutenticazioneRegistratiProprietario(){
    return(
        <Form className="contenitoreAutenticazione">
            <div className="contentNewCheckAutenticazione">
                <h2>Iscriviti</h2>
        <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="name" placeholder="Nome" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridSurname">
                <Form.Label>Cognome</Form.Label>
                    <Form.Control type="surname" placeholder="Cognome" required/>
                </Form.Group>
            <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>E-mail</Form.Label>
                    <Form.Control type="email" placeholder="E-mail" required />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" required/>
                </Form.Group>
            <Form.Group as={Col} controlId="formGridIndirizzo">
            <Form.Label>Telefono</Form.Label>
            <Form.Control type="tel" placeholder="Telefono" required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridIndirizzo">
            <Form.Label>Documento</Form.Label>
            <Form.Control type="tel" placeholder="Documento" required/>
            </Form.Group>

            <Form.Group as={Col} controlId="formGridCap">
            <Form.Label>Data di nascita</Form.Label>
            <Form.Control type="date" required className="inputSignUp"/>
            </Form.Group>
            <Link to="/secondaAutenticazioneRegistrati">Torna indietro</Link>
          </div>
          
          <Button variant="primary" type="submit" className="pulsante">
                    Registrati
            </Button>
        </Form>
    );
}
export default SecondaAutenticazioneRegistratiProprietario