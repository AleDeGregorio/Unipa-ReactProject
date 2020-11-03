/*CSS COMPLETATO*/

import React from 'react';    
import {Form, Col, Row, Button} from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './secondaAutenticazione.css'

function SecondaAutenticazioneAccedi(){
    return(
        <div className="accedi">
            <Form className="contenitoreAutenticazione">
                <h2>Accedi</h2>
                   <Form.Group as={Col} controlId="formGridEmail">
                        <Form.Control type="email" placeholder="E-mail" required />
                    </Form.Group>
        
                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Control type="password" placeholder="Password" required/>
                    </Form.Group>
                    <label>Non sei iscritto?<Link to="/secondaAutenticazioneRegistrati"> REGISTRATI</Link></label>
                <Button variant="primary" type="submit" className="pulsante">
                    Accedi
                </Button>
            </Form>
        </div>
    );
}export default SecondaAutenticazioneAccedi