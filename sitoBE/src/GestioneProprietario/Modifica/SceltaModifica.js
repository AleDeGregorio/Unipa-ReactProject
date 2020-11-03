import React from 'react';
import Card from 'react-bootstrap/Card'
import CardColumns from 'react-bootstrap/CardColumns'
import './SceltaModifica.css'
import {SiCashapp} from "react-icons/si";
import {RiAccountBoxLine} from "react-icons/ri";
import {Link} from 'react-router-dom'
import {Col} from 'react-bootstrap'

import { Redirect } from 'react-router-dom';

class SceltaModifica extends React.Component{
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
        else {
            return(
                <div className="row carte_prop" >
                    <Link to= "/ElencoCasaVacanza" className="LinK">
                <Card className="propScelta">
                    <Card.Body>
                    <Card.Title>Modifica Casa Vacanza</Card.Title>
                    <Card.Text>Visualizza tutti e dati della casa ed eventualmente modifica</Card.Text>
                    </Card.Body>
                </Card></Link>
                <Link to = "/ElencoB&B" className="LinK">
                    <Card className="propScelta">
                    <Card.Body>
                    <Card.Title>Modifica B&B</Card.Title>
                    <Card.Text>modifica dati della struttura ed eventualmente le sue stanze.</Card.Text>
                    </Card.Body>
                   </Card>
                </Link>
        
              </div>
            );
        }
    }
}
export default SceltaModifica;