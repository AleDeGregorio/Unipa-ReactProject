import React from 'react';    
import './Checkin.css'

class CheckinEffettuato extends React.Component {
    render() {
        return (
            <div className = "Autenticazione">
                <h1>Check-in effettuato con successo!</h1>
                <p>I dati inseriti sono stati correttamente inviati alla questura.</p>
            </div>
        );
    }
}

export default CheckinEffettuato;