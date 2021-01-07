import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
import DropdownButton from 'react-bootstrap/DropdownButton'
import Nav from 'react-bootstrap/Nav'
import { FcMenu } from 'react-icons/fc'
import {CgProfile} from 'react-icons/cg'
import './NavCss.css'

class NavBar extends React.Component {
    
    onClick = (e) => {
        localStorage.clear();
    }

    render() {
        if(localStorage.getItem('logged') && localStorage.getItem('cliente')) {
            var nome = localStorage.getObj('user_data')[0].nome_cl;
            var cognome = localStorage.getObj('user_data')[0].cognome_cl;
            return(
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sito Progetto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/BnB">BnB</Nav.Link>
                        <Nav.Link href="/CasaVacanza">Casa Vacanza</Nav.Link>
                    </Nav>
                <Dropdown>
                    <DropdownButton className="ticambio" title={Menu} menuAlign="right"
                    ><Menu />{nome} {cognome}
                    <Dropdown.Menu >
                        <Dropdown.Item href="/GestionePrenotazione" >Gestisci prenotazioni</Dropdown.Item>
                        <Dropdown.Item href="/DiventaHost">Diventa un host</Dropdown.Item>
                        <Dropdown.Item href="/DatiPersonali">Dati personali</Dropdown.Item>
                        <Dropdown.Item href="/autenticazioneAccedi" onClick = {this.onClick}>Logout</Dropdown.Item>
                    </Dropdown.Menu></DropdownButton>
                </Dropdown>
             </Navbar.Collapse>
            </Navbar>
            );
        }
        //<Nav.Link href="/PaginaProprietario">Area personale</Nav.Link>
       //<Nav.Link href="/autenticazioneAccedi" onClick = {this.onClick}>ESCI</Nav.Link>
        if(localStorage.getItem('logged') && localStorage.getItem('proprietario')) {
            return(
                <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sito Progetto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/BnB">BnB</Nav.Link>
                        <Nav.Link href="/CasaVacanza">Casa Vacanza</Nav.Link>
                    </Nav>
                <Nav.Link href="/PaginaProprietario">Area personale</Nav.Link>
                <Nav.Link href="/autenticazioneAccedi" onClick = {this.onClick}>ESCI</Nav.Link>
                  
                </Navbar.Collapse>
            </Navbar>
            );
        }
        return(
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">Sito Progetto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                        <Nav.Link href="/">Home</Nav.Link>
                        <Nav.Link href="/BnB">BnB</Nav.Link>
                        <Nav.Link href="/CasaVacanza">Casa Vacanza</Nav.Link>
                    </Nav>
                        <Nav.Link href="/autenticazioneAccedi">ACCEDI</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;

function Menu (){
    return(
        <CgProfile className="menu-prop" />
    )
}
/*<Dropdown>
                   <Dropdown.Toggle as={Menu}>
                 </Dropdown.Toggle>

             <Dropdown.Menu >
               <Dropdown.Item eventKey="1">Gestisci prenotazioni</Dropdown.Item>
               <Dropdown.Item eventKey="2">Logout</Dropdown.Item>
               <Dropdown.Item eventKey="3"></Dropdown.Item>
               
              </Dropdown.Menu>
             </Dropdown>
             
             
                <Nav.Link href="/GestionePrenotazione">Le tue prenotazioni</Nav.Link>
                <Nav.Link href="/DiventaHost">Diventa un Host</Nav.Link>
                <Nav.Link href="/autenticazioneAccedi" onClick = {this.onClick}>Logout</Nav.Link>
                <Nav.Link href="/DatiPersonali">Modifica Account</Nav.Link>
             */

             