import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import './secondaAutenticazione.css'

function SecondaAutenticazioneAccedi(){
    return(
        <div className="accedi">
            <Form className="contenitoreAutenticazione">
                <div className="contentNewCheckAutenticazione">
                <h2>Accedi</h2>
                <Form.Row>
                   <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control type="email" placeholder="E-mail" required />
                    </Form.Group>
        
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>
                </Form.Row>
                </div>
                <Button variant="primary" type="submit" className="pulsante">
                    Accedi
                </Button>
            </Form>
            </div>
    );
}export default SecondaAutenticazioneAccedi