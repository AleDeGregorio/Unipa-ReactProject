import React from 'react';
import {Card, Modal, Button} from 'react-bootstrap'
//import {Nav, CardColumns} from 'react-bootstrap'
import './ProprietarioPage.css'
import {SiCashapp} from "react-icons/si"
import {RiAccountBoxLine} from "react-icons/ri"
import {AiFillCheckSquare} from "react-icons/ai"
import {FaHotel} from "react-icons/fa"
import {RiMailSendLine} from "react-icons/ri"
import {FaClipboardList} from "react-icons/fa"
import {BsTools} from "react-icons/bs"
import {Link} from 'react-router-dom'

import { Redirect } from "react-router-dom";


class ProprietarioPage extends React.Component {

    constructor(props){
        super(props);

        this.state = {
            email: localStorage.getItem('email'),
            apiResponse: [],
            error: false,
            errorMessage: '',
            show: false,
            empty: false
        }
    }
    componentDidMount() {
        const data = {
            email: this.state.email
        };

        fetch('http://localhost:9000/getDataInvio/dataInvio',{
            method: 'POST',
            headers: {
                'Content-type':'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result)=>result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });
            var res = JSON.parse(result);

            if(res.length < 1 || (res.code && res.code === 404)) {
              this.setState({ empty: true, errorMessage: res.message });
            }
      
            else if(this.state.apiResponse.status === 'error') {
              this.setState({ error: true });
              this.setState({ errorMessage: this.state.apiResponse.message });
            }
        })
    }

    handleClose = () => {
        this.setState({
            show: false
        });
    }
    
    handleShow = () => {
        this.setState({
            show: true
        });
    }

    render() {
        var data_invio = this.state.apiResponse[0] ? new Date(this.state.apiResponse[0].ultimo_invio_dati).toLocaleDateString() : "Mai inviati";

        var datiTurismo = (
            <div className="turismocont">
                <p>Ultimo invio dei dati all'ufficio competente: {data_invio} </p>
                <p>Desideri inviare i dati nuovamente?</p>
            </div>
        );
    
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
        else if(this.state.errorMessage) {
            datiTurismo = (
                <div className="turismocont">
                    <p>Si è verificato un errore: {this.state.errorMessage}</p>
                </div>
            );
        }

        return(
            <div className="GestioneProprietario">
                    <div className="carte_prop" >
                        <Link to = "/Testina" className="LinK">
                            <Card id="prop">
                                <FaClipboardList className="imageProp"/>
                                <Card.Title className="TitoloCard">Gestisci Prenotazioni</Card.Title>
                                <Card.Text className="TestoCard">Gestisci le prenotazioni in attesa e quelle già accettate.</Card.Text>
                            </Card>
                        </Link>
                            <Card id="prop" onClick = {this.handleShow}>
                                <RiMailSendLine className="imageProp"/>
                                <Card.Title>Invio dati Turismo </Card.Title>
                                <Card.Text>Effettua l'invio dei dati relativi ai soggiornanti all'ufficio del turismo.</Card.Text>
                            </Card>
                                <Modal show={this.state.show} onHide={this.handleClose}>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Invio dati all'ufficio del turismo</Modal.Title>
                                            </Modal.Header>
                                                <Modal.Body>
                                                    {datiTurismo}
                                                </Modal.Body>
                                    <Modal.Footer>
                                        <Button variant="secondary" /*funzione invia dationClick={}*/>Invia dati</Button>
                                        <Button variant="secondary" onClick={this.handleClose}>
                                            Chiudi
                                        </Button>                    
                                    </Modal.Footer>
                                </Modal>
                    </div>
                    <div className="carte_prop">
                        <Link to = "/InserimentoProprietà" className="LinK">
                            <Card id="prop">
                                <FaHotel className="imageProp"/>
                                <Card.Title>Inserisci Proprietà</Card.Title>
                                <Card.Text>Scegli tra le tipologie di strutture presenti nel sistema e inserisci la tua! </Card.Text>
                            </Card>
                        </Link>
                        <Link to = "/SceltaModifica" className="LinK">
                            <Card  id="prop">
                                <BsTools className="imageProp"/>
                                <Card.Title>Modifica Proprietà</Card.Title>
                                <Card.Text>Scegli tra le strutture possedute ed effettua i cambiamenti che preferisci.</Card.Text>
                            </Card>
                        </Link>
                    </div>
                    <div className="carte_prop">
                        <Link to = "/DatiPersonali" className="LinK">
                            <Card id="prop">
                                <RiAccountBoxLine className="imageProp" />
                                <Card.Title>Gestione Account</Card.Title>
                                <Card.Text>Vedi le opzioni disponibili</Card.Text>
                            </Card>
                            </Link>
                            <Link to = "/Earning" className="LinK">
                                <Card id="prop">
                                <SiCashapp className="imageProp" />
                                    <Card.Title>Resoconto Guadagni</Card.Title>
                                    <Card.Text>Visualizza </Card.Text>
                                </Card>
                            </Link>
                        </div>
                </div>
        );
    }
}

export default ProprietarioPage;

