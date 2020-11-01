import React from 'react';
import Card from 'react-bootstrap/Card';

import { Redirect } from 'react-router-dom';

class Cliente extends React.Component{
    render() {
        if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            var nome = localStorage.getObj('user_data')[0].nome_cl;
            var cognome = localStorage.getObj('user_data')[0].cognome_cl;
            return(
                <div className="PaginaCliente">
                    <h1>BENVENUTO, {nome} {cognome}!</h1>
                    <div className="row">
                        <div className="col">
                            <Card>

                            </Card>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return <Redirect to = "/ErrorPage" error = {true} errorMessage = {"Utente non autorizzato"} />
        }
    }
}
export default Cliente;