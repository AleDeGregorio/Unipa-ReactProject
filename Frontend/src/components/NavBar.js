import React from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Dropdown from 'react-bootstrap/Dropdown'
//import NavDropdown from 'react-bootstrap/NavDropdown'
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
                        <Nav.Link href="/PaginaCliente">Area personale</Nav.Link>
                        <Nav.Link href="/SecondaAutenticazioneAccedi" onClick = {this.onClick}>ESCI</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
            );
        }
        //<Nav.Link href="/PaginaProprietario">Area personale</Nav.Link>
       //<Nav.Link href="/SecondaAutenticazioneAccedi" onClick = {this.onClick}>ESCI</Nav.Link>
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
                   <Dropdown>
                   <Dropdown.Toggle as={Menu} >
                 </Dropdown.Toggle>

             <Dropdown.Menu >
               <Dropdown.Item eventKey="1">Gestisci prenotazioni</Dropdown.Item>
               <Dropdown.Item eventKey="2">Logout</Dropdown.Item>
               <Dropdown.Item eventKey="3"></Dropdown.Item>
               
              </Dropdown.Menu>
             </Dropdown>
                  
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
                        <Nav.Link href="/secondaAutenticazioneAccedi">ACCEDI</Nav.Link>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;

function Menu (){
    return(
        <FcMenu className="menu-prop" />
    )
}