//CSS COMPLETATO

import React from 'react';
import Card from 'react-bootstrap/Card';
import {Button} from 'react-bootstrap'
import './ClientePage.css'

class Cliente extends React.Component{
    render() {
        if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            var nome = localStorage.getObj('user_data')[0].nome_cl;
            var cognome = localStorage.getObj('user_data')[0].cognome_cl;
            return(
                <div className="PaginaCliente">
                    <h1>BENVENUTO !</h1>
                    <div className="contenitoreContainer">
                        <div className="containerDati">
                            <h3>DATI PERSONALI</h3>
                            <div className="Dati">
                                <ul>
                                    <li>
                                        Nome: 
                                    </li>
                                    <li>
                                        Cognome:
                                    </li>
                                    <li>
                                        Data di nascita:
                                    </li>
                                    <li>
                                        E-mail:
                                    </li>
                                    <li>
                                        Telefono:
                                    </li>
                                    <li>
                                        Data di nascita:
                                    </li>
                                </ul>
                            </div>
                            
                        <Button>Modifica dati</Button>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return(
                <div className="containerAutenticazioneFallita">
                <div className = "AutenticazioneFallita">
                  <h1>Si è verificato un errore!</h1>
                  <p>Utente non autorizzato</p>
                </div>
                </div>
              );
        }
    }
}
export default Cliente;

