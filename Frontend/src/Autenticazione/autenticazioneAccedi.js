/*CSS COMPLETATO*/

import React from 'react';    
import {Form, Col, Button} from 'react-bootstrap'
//import { Row } from 'react-bootstrap'
import {Link} from 'react-router-dom'
import './autenticazione.css'

import { Redirect } from 'react-router-dom';

class autenticazioneAccedi extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.props.onChange(e);
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        var messaggioErrore;

        if(this.props.error && this.props.errorMessage !== '') {
            messaggioErrore = <p style={{color: 'red'}}>Nome utente o password errati</p>;
        }

        if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            return <Redirect to = "/PaginaCliente" />
        }
        
        if(localStorage.getItem('logged') && localStorage.getItem('proprietario')) {
            return <Redirect to = "/PaginaProprietario" />
        }

        return(
            <div className="accedi">
                <Form className="contenitoreAutenticazione" onSubmit = {this.props.onSubmitLogin}>
                    <h2>Accedi</h2>
                        <Form.Group as={Col} controlId="formGridEmail">
                            <Form.Control type="email" name = "email" placeholder="E-mail" onChange = {this.handleChange} required />
                        </Form.Group>
            
                        <Form.Group as={Col} controlId="formGridPassword">
                            <Form.Control type="password" name = "password" placeholder="Password" onChange = {this.handleChange} required/>
                        </Form.Group>
                        {messaggioErrore}
                        <label>Non sei iscritto?<Link to="/autenticazioneRegistrati"> REGISTRATI</Link></label>
                    <Button variant="primary" type="submit" className="pulsante">
                        Accedi
                    </Button>
                </Form>
            </div>
        );
    }
}

export default autenticazioneAccedi