import React from 'react';  
import {Button} from 'react-bootstrap';  
import './Checkin.css'

import { Redirect } from "react-router-dom"

class CheckinEffettuato extends React.Component {
    render() {
        if(!localStorage.getItem('logged') || !localStorage.getItem('proprietario')) {
            return <Redirect
                to={{
                    pathname: "/ErrorPage",
                    state: { 
                        error: true,
                        errorMessage: "Utente non autorizzato" 
                    }
                }}
            />
        }
        return (
            <div className = "Autenticazione">
                <h1>Check-in effettuato con successo!</h1>
                <p>I dati inseriti sono stati correttamente inviati alla questura.</p>
                <Button>Torna indietro</Button>
            </div>
        );
    }
}

export default CheckinEffettuato;