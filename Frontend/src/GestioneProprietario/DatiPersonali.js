import React from 'react'
import { Button, Col, Form, Accordion, Card} from 'react-bootstrap'
import {AiOutlineEdit} from 'react-icons/ai'
import {CgProfile} from 'react-icons/cg'
//import { Row } from 'react-bootstrap'
//import {Accordion, AccordionSummary, AccordionDetails} from '@material-ui/core'
//import {MdExpandMore} from 'react-icons/md'
//import {Container} from '@material-ui/core'
import './DatiPersonali.css'

import { Redirect } from "react-router-dom";

/*

    ----------  LEGGI QUI:  ----------

    I dati personali che il proprietario può modificare sono:

        password
        documento
        numero di telefono

    ----------------------------------
*/

class DatiPersonali extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            password: '',
            nome: localStorage.getObj('user_data')[0].nome_prop,
            cognome: localStorage.getObj('user_data')[0].cognome_prop,
            nascita: new Date(localStorage.getObj('user_data')[0].data_nascita_prop).toLocaleDateString(),
            num_documento: localStorage.getObj('user_data')[0].num_documento,
            telefono: localStorage.getObj('user_data')[0].telefono_prop,
            email: localStorage.getItem('email'),
            apiResponse: [],
            error: false,
            errorMessage: '',
            show: false
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit = (e) => {
        e.preventDefault();

        const data = {
            email: this.state.email,
            password: this.state.password,
            nome: this.state.nome,
            cognome: this.state.cognome,
            nascita: this.state.nascita,
            telefono: this.state.telefono,
            num_documento: this.state.num_documento
        }

        fetch('http://localhost:9000/updateProprietario/fields', {
            method: "POST",
            headers: {
                'Content-type' : 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((result) => result.text())
        .then((result)=>{
            this.setState({ apiResponse:JSON.parse(result) });

            if(this.state.apiResponse.status === 'error') {
                this.setState({ error: true });
                this.setState({ errorMessage: this.state.apiResponse.message });
            }
            else {
                this.setState({ success: true })
            }
        });
    }

    render() {
        /*
        if(this.state.success) {
            return (
                <div className = 'Errore'>
                    <h1>Modifiche avvenute con successo!</h1>
                </div>
            );
        }
        else if (this.state.error) {
            return <Redirect 
            to = {{
              pathname: "/ErrorPage",
              state: {
                error: true,
                errorMessage: this.state.errorMessage
              }
            }}
          />
        }
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
        else*/ {
            var nome = this.state.nome;
            var cognome = this.state.cognome;
            var nascita = this.state.nascita
            var email = this.state.email;
            var telefono = this.state.telefono;
            var num_documento = this.state.num_documento;

            return(
                <Form className="contenitore">
                            <div className="contentNewCheck">
                            <h2>Qui puoi modificare i tuoi dati personali!</h2>
                            <Accordion >
                            <Card border="light">
                                 <div className="first-cont">
                                   <CgProfile className="imgprof" />
                                   <div className="datiprofilo">
                                     <p> Nome : {nome} </p>
                                     <p> Cognome :  {cognome}</p>
                                     <p>Email : {email} </p>
                                   </div>
                                </div>
                            </Card>
                            <Card border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                    <p>indirizzo, codice postale, città, provincia nazione</p>
                                    </div>
                                    <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="1">
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                    <Form.Row>
                                <Form.Group as={Col} controlId="formGridAddress1">
                                    <Form.Label>Indirizzo</Form.Label>
                                    <Form.Control type="surname" placeholder="Inserire indirizzo cliente" required/>
                                </Form.Group>              
                                <Form.Group as={Col} controlId="formGridZip">
                                    <Form.Label>Codice Postale</Form.Label>
                                    <Form.Control type="zip" placeholder="Inserire codice postale cliente" required/>
                                </Form.Group>
                            </Form.Row>
                            
                            <Form.Row>
                                <Form.Group as={Col} controlId="formGridCity">
                                <Form.Label>Città</Form.Label>
                                <Form.Control type="city" placeholder="Inserire città del cliente" required/>
                                </Form.Group>
                
                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Provincia</Form.Label>
                                <Form.Control as="select" required>
                                        <option></option>
                                        <option value="ag">Agrigento</option>
                                        <option value="al">Alessandria</option>
                                        <option value="an">Ancona</option>
                                        <option value="ao">Aosta</option>
                                        <option value="ar">Arezzo</option>
                                        <option value="ap">Ascoli Piceno</option>
                                        <option value="at">Asti</option>
                                        <option value="av">Avellino</option>
                                        <option value="ba">Bari</option>
                                        <option value="bt">Barletta-Andria-Trani</option>
                                        <option value="bl">Belluno</option>
                                        <option value="bn">Benevento</option>
                                        <option value="bg">Bergamo</option>
                                        <option value="bi">Biella</option>
                                        <option value="bo">Bologna</option>
                                        <option value="bz">Bolzano</option>
                                        <option value="bs">Brescia</option>
                                        <option value="br">Brindisi</option>
                                        <option value="ca">Cagliari</option>
                                        <option value="cl">Caltanissetta</option>
                                        <option value="cb">Campobasso</option>
                                        <option value="ci">Carbonia-iglesias</option>
                                        <option value="ce">Caserta</option>
                                        <option value="ct">Catania</option>
                                        <option value="cz">Catanzaro</option>
                                        <option value="ch">Chieti</option>
                                        <option value="co">Como</option>
                                        <option value="cs">Cosenza</option>
                                        <option value="cr">Cremona</option>
                                        <option value="kr">Crotone</option>
                                        <option value="cn">Cuneo</option>
                                        <option value="en">Enna</option>
                                        <option value="fm">Fermo</option>
                                        <option value="fe">Ferrara</option>
                                        <option value="fi">Firenze</option>
                                        <option value="fg">Foggia</option>
                                        <option value="fc">Forl&igrave;-Cesena</option>
                                        <option value="fr">Frosinone</option>
                                        <option value="ge">Genova</option>
                                        <option value="go">Gorizia</option>
                                        <option value="gr">Grosseto</option>
                                        <option value="im">Imperia</option>
                                        <option value="is">Isernia</option>
                                        <option value="sp">La spezia</option>
                                        <option value="aq">L'aquila</option>
                                        <option value="lt">Latina</option>
                                        <option value="le">Lecce</option>
                                        <option value="lc">Lecco</option>
                                        <option value="li">Livorno</option>
                                        <option value="lo">Lodi</option>
                                        <option value="lu">Lucca</option>
                                        <option value="mc">Macerata</option>
                                        <option value="mn">Mantova</option>
                                        <option value="ms">Massa-Carrara</option>
                                        <option value="mt">Matera</option>
                                        <option value="vs">Medio Campidano</option>
                                        <option value="me">Messina</option>
                                        <option value="mi">Milano</option>
                                        <option value="mo">Modena</option>
                                        <option value="mb">Monza e della Brianza</option>
                                        <option value="na">Napoli</option>
                                        <option value="no">Novara</option>
                                        <option value="nu">Nuoro</option>
                                        <option value="og">Ogliastra</option>
                                        <option value="ot">Olbia-Tempio</option>
                                        <option value="or">Oristano</option>
                                        <option value="pd">Padova</option>
                                        <option value="pa">Palermo</option>
                                        <option value="pr">Parma</option>
                                        <option value="pv">Pavia</option>
                                        <option value="pg">Perugia</option>
                                        <option value="pu">Pesaro e Urbino</option>
                                        <option value="pe">Pescara</option>
                                        <option value="pc">Piacenza</option>
                                        <option value="pi">Pisa</option>
                                        <option value="pt">Pistoia</option>
                                        <option value="pn">Pordenone</option>
                                        <option value="pz">Potenza</option>
                                        <option value="po">Prato</option>
                                        <option value="rg">Ragusa</option>
                                        <option value="ra">Ravenna</option>
                                        <option value="rc">Reggio di Calabria</option>
                                        <option value="re">Reggio nell'Emilia</option>
                                        <option value="ri">Rieti</option>
                                        <option value="rn">Rimini</option>
                                        <option value="rm">Roma</option>
                                        <option value="ro">Rovigo</option>
                                        <option value="sa">Salerno</option>
                                        <option value="ss">Sassari</option>
                                        <option value="sv">Savona</option>
                                        <option value="si">Siena</option>
                                        <option value="sr">Siracusa</option>
                                        <option value="so">Sondrio</option>
                                        <option value="ta">Taranto</option>
                                        <option value="te">Teramo</option>
                                        <option value="tr">Terni</option>
                                        <option value="to">Torino</option>
                                        <option value="tp">Trapani</option>
                                        <option value="tn">Trento</option>
                                        <option value="tv">Treviso</option>
                                        <option value="ts">Trieste</option>
                                        <option value="ud">Udine</option>
                                        <option value="va">Varese</option>
                                        <option value="ve">Venezia</option>
                                        <option value="vb">Verbano-Cusio-Ossola</option>
                                        <option value="vc">Vercelli</option>
                                        <option value="vr">Verona</option>
                                        <option value="vv">Vibo valentia</option>
                                        <option value="vi">Vicenza</option>
                                        <option value="vt">Viterbo</option>
                                </Form.Control>
                                </Form.Group> 
                
                                <Form.Group as={Col} controlId="formGridState">
                                <Form.Label>Nazione</Form.Label>
                                <Form.Control as="select" required>
                                    <option></option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="AF">Afghanistan</option>
                                    <option value="AL">Albania</option>
                                    <option value="DZ">Algeria</option>
                                    <option value="AS">American Samoa</option>
                                    <option value="AD">Andorra</option>
                                    <option value="AO">Angola</option>
                                    <option value="AI">Anguilla</option>
                                    <option value="AQ">Antarctica</option>
                                    <option value="AG">Antigua and Barbuda</option>
                                    <option value="AR">Argentina</option>
                                    <option value="AM">Armenia</option>
                                    <option value="AW">Aruba</option>
                                    <option value="AU">Australia</option>
                                    <option value="AT">Austria</option>
                                    <option value="AZ">Azerbaijan</option>
                                    <option value="BS">Bahamas</option>
                                    <option value="BH">Bahrain</option>
                                    <option value="BD">Bangladesh</option>
                                    <option value="BB">Barbados</option>
                                    <option value="BY">Belarus</option>
                                    <option value="BE">Belgium</option>
                                    <option value="BZ">Belize</option>
                                    <option value="BJ">Benin</option>
                                    <option value="BM">Bermuda</option>
                                    <option value="BT">Bhutan</option>
                                    <option value="BO">Bolivia</option>
                                    <option value="BA">Bosnia and Herzegovina</option>
                                    <option value="BW">Botswana</option>
                                    <option value="BV">Bouvet Island</option>
                                    <option value="BR">Brazil</option>
                                    <option value="IO">British Indian Ocean Territory</option>
                                    <option value="BN">Brunei Darussalam</option>
                                    <option value="BG">Bulgaria</option>
                                    <option value="BF">Burkina Faso</option>
                                    <option value="BI">Burundi</option>
                                    <option value="KH">Cambodia</option>
                                    <option value="CM">Cameroon</option>
                                    <option value="CV">Cape Verde</option>
                                    <option value="KY">Cayman Islands</option>
                                    <option value="CF">Central African Republic</option>
                                    <option value="TD">Chad</option>
                                    <option value="CL">Chile</option>
                                    <option value="CN">China</option>
                                    <option value="CX">Christmas Island</option>
                                    <option value="CC">Cocos (Keeling) Islands</option>
                                    <option value="CO">Colombia</option>
                                    <option value="KM">Comoros</option>
                                    <option value="CG">Congo</option>
                                    <option value="CD">Congo (Democratic Republic)</option>
                                    <option value="CK">Cook Islands</option>
                                    <option value="CR">Costa Rica</option>
                                    <option value="HR">Croatia</option>
                                    <option value="CU">Cuba</option>
                                    <option value="CY">Cyprus</option>
                                    <option value="CZ">Czech Republic</option>
                                    <option value="DK">Denmark</option>
                                    <option value="DJ">Djibouti</option>
                                    <option value="DM">Dominica</option>
                                    <option value="DO">Dominican Republic</option>
                                    <option value="TP">East Timor</option>
                                    <option value="EC">Ecuador</option>
                                    <option value="EG">Egypt</option>
                                    <option value="SV">El Salvador</option>
                                    <option value="GQ">Equatorial Guinea</option>
                                    <option value="ER">Eritrea</option>
                                    <option value="EE">Estonia</option>
                                    <option value="ET">Ethiopia</option>
                                    <option value="FK">Falkland Islands</option>
                                    <option value="FO">Faroe Islands</option>
                                    <option value="FJ">Fiji</option>
                                    <option value="FI">Finland</option>
                                    <option value="FR">France</option>
                                    <option value="FX">France (European Territory)</option>
                                    <option value="GF">French Guiana</option>
                                    <option value="TF">French Southern Territories</option>
                                    <option value="GA">Gabon</option>
                                    <option value="GM">Gambia</option>
                                    <option value="GE">Georgia</option>
                                    <option value="DE">Germany</option>
                                    <option value="GH">Ghana</option>
                                    <option value="GI">Gibraltar</option>
                                    <option value="GR">Greece</option>
                                    <option value="GL">Greenland</option>
                                    <option value="GD">Grenada</option>
                                    <option value="GP">Guadeloupe</option>
                                    <option value="GU">Guam</option>
                                    <option value="GT">Guatemala</option>
                                    <option value="GN">Guinea</option>
                                    <option value="GW">Guinea Bissau</option>
                                    <option value="GY">Guyana</option>
                                    <option value="HT">Haiti</option>
                                    <option value="HM">Heard and McDonald Islands</option>
                                    <option value="VA">Holy See (Vatican)</option>
                                    <option value="HN">Honduras</option>
                                    <option value="HK">Hong Kong</option>
                                    <option value="HU">Hungary</option>
                                    <option value="IS">Iceland</option>
                                    <option value="IN">India</option>
                                    <option value="ID">Indonesia</option>
                                    <option value="IR">Iran</option>
                                    <option value="IQ">Iraq</option>
                                    <option value="IE">Ireland</option>
                                    <option value="IL">Israel</option>
                                    <option value="IT"selected="selected">Italy</option>
                                    <option value="CI">Cote D&rsquo;Ivoire</option>
                                    <option value="JM">Jamaica</option>
                                    <option value="JP">Japan</option>
                                    <option value="JO">Jordan</option>
                                    <option value="KZ">Kazakhstan</option>
                                    <option value="KE">Kenya</option>
                                    <option value="KI">Kiribati</option>
                                    <option value="KW">Kuwait</option>
                                    <option value="KG">Kyrgyzstan</option>
                                    <option value="LA">Laos</option>
                                    <option value="LV">Latvia</option>
                                    <option value="LB">Lebanon</option>
                                    <option value="LS">Lesotho</option>
                                    <option value="LR">Liberia</option>
                                    <option value="LY">Libya</option>
                                    <option value="LI">Liechtenstein</option>
                                    <option value="LT">Lithuania</option>
                                    <option value="LU">Luxembourg</option>
                                    <option value="MO">Macau</option>
                                    <option value="MK">Macedonia</option>
                                    <option value="MG">Madagascar</option>
                                    <option value="MW">Malawi</option>
                                    <option value="MY">Malaysia</option>
                                    <option value="MV">Maldives</option>
                                    <option value="ML">Mali</option>
                                    <option value="MT">Malta</option>
                                    <option value="MH">Marshall Islands</option>
                                    <option value="MQ">Martinique</option>
                                    <option value="MR">Mauritania</option>
                                    <option value="MU">Mauritius</option>
                                    <option value="YT">Mayotte</option>
                                    <option value="MX">Mexico</option>
                                    <option value="FM">Micronesia</option>
                                    <option value="MD">Moldova</option>
                                    <option value="MC">Monaco</option>
                                    <option value="MN">Mongolia</option>
                                    <option value="ME">Montenegro</option>
                                    <option value="MS">Montserrat</option>
                                    <option value="MA">Morocco</option>
                                    <option value="MZ">Mozambique</option>
                                    <option value="MM">Myanmar</option>
                                    <option value="NA">Namibia</option>
                                    <option value="NR">Nauru</option>
                                    <option value="NP">Nepal</option>
                                    <option value="NL">Netherlands</option>
                                    <option value="AN">Netherlands Antilles</option>
                                    <option value="NC">New Caledonia</option>
                                    <option value="NZ">New Zealand</option>
                                    <option value="NI">Nicaragua</option>
                                    <option value="NE">Niger</option>
                                    <option value="NG">Nigeria</option>
                                    <option value="NU">Niue</option>
                                    <option value="NF">Norfolk Island</option>
                                    <option value="KP">North Korea</option>
                                    <option value="MP">Northern Mariana Islands</option>
                                    <option value="NO">Norway</option>
                                    <option value="OM">Oman</option>
                                    <option value="PK">Pakistan</option>
                                    <option value="PW">Palau</option>
                                    <option value="PS">Palestinian Territory</option>
                                    <option value="PA">Panama</option>
                                    <option value="PG">Papua New Guinea</option>
                                    <option value="PY">Paraguay</option>
                                    <option value="PE">Peru</option>
                                    <option value="PH">Philippines</option>
                                    <option value="PN">Pitcairn</option>
                                    <option value="PL">Poland</option>
                                    <option value="PF">Polynesia</option>
                                    <option value="PT">Portugal</option>
                                    <option value="PR">Puerto Rico</option>
                                    <option value="QA">Qatar</option>
                                    <option value="RE">Reunion</option>
                                    <option value="RO">Romania</option>
                                    <option value="RU">Russian Federation</option>
                                    <option value="RW">Rwanda</option>
                                    <option value="GS">S. Georgia &amp; S. Sandwich Isls.</option>
                                    <option value="SH">Saint Helena</option>
                                    <option value="KN">Saint Kitts &amp; Nevis Anguilla</option>
                                    <option value="LC">Saint Lucia</option>
                                    <option value="PM">Saint Pierre and Miquelon</option>
                                    <option value="VC">Saint Vincent &amp; Grenadines</option>
                                    <option value="WS">Samoa</option>
                                    <option value="SM">San Marino</option>
                                    <option value="ST">Sao Tome and Principe</option>
                                    <option value="SA">Saudi Arabia</option>
                                    <option value="SN">Senegal</option>
                                    <option value="RS">Serbia</option>
                                    <option value="SC">Seychelles</option>
                                    <option value="SL">Sierra Leone</option>
                                    <option value="SG">Singapore</option>
                                    <option value="SK">Slovakia</option>
                                    <option value="SI">Slovenia</option>
                                    <option value="SB">Solomon Islands</option>
                                    <option value="SO">Somalia</option>
                                    <option value="ZA">South Africa</option>
                                    <option value="KR">South Korea</option>
                                    <option value="ES">Spain</option>
                                    <option value="LK">Sri Lanka</option>
                                    <option value="SD">Sudan</option>
                                    <option value="SR">Suriname</option>
                                    <option value="SZ">Swaziland</option>
                                    <option value="SE">Sweden</option>
                                    <option value="CH">Switzerland</option>
                                    <option value="SY">Syrian Arab Republic</option>
                                    <option value="TW">Taiwan</option>
                                    <option value="TJ">Tajikistan</option>
                                    <option value="TZ">Tanzania</option>
                                    <option value="TH">Thailand</option>
                                    <option value="TG">Togo</option>
                                    <option value="TK">Tokelau</option>
                                    <option value="TO">Tonga</option>
                                    <option value="TT">Trinidad and Tobago</option>
                                    <option value="TN">Tunisia</option>
                                    <option value="TR">Turkey</option>
                                    <option value="TM">Turkmenistan</option>
                                    <option value="TC">Turks and Caicos Islands</option>
                                    <option value="TV">Tuvalu</option>
                                    <option value="UG">Uganda</option>
                                    <option value="UA">Ukraine</option>
                                    <option value="AE">United Arab Emirates</option>
                                    <option value="GB">United Kingdom</option>
                                    <option value="UY">Uruguay</option>
                                    <option value="UM">USA Minor Outlying Islands</option>
                                    <option value="UZ">Uzbekistan</option>
                                    <option value="VU">Vanuatu</option>
                                    <option value="VE">Venezuela</option>
                                    <option value="VN">Vietnam</option>
                                    <option value="VG">Virgin Islands (British)</option>
                                    <option value="VI">Virgin Islands (USA)</option>
                                    <option value="WF">Wallis and Futuna Islands</option>
                                    <option value="EH">Western Sahara</option>
                                    <option value="YE">Yemen</option>
                                    <option value="ZR">Zaire</option>
                                    <option value="ZM">Zambia</option>
                                    <option value="ZW">Zimbabwe</option>
                                </Form.Control>
                                </Form.Group> 
                            </Form.Row>
                            <Button variant="primary" type="submit">
                                Modifica dati
                            </Button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                        <p>Documento : {num_documento}</p>
                                    </div>
                                    <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="2">
                                    Modifica
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="2">
                                    <Card.Body>
                                    <Form.Row>
                                <Form.Group as={Col} controlId="formGridDocument">
                                    <Form.Label>Numero documento</Form.Label>
                                    <Form.Control 
                                        type="document_num" 
                                        defaultValue = {num_documento}
                                        id = "num_documento"
                                        name = "num_documento"
                                        onChange = {this.onChange}
                                    />
                                </Form.Group>
                                <Form.Group as={Col} controlId="formGridState" >
                                <Form.Label>Tipo documento</Form.Label>
                                <Form.Control as="select" className="prova" required>
                                    <option></option>
                                    <option>Carta di identità</option>
                                    <option>Patente</option>
                                    <option>Passaporto</option>
                                </Form.Control>
                                </Form.Group>
                            </Form.Row>
                            <Button variant="primary" type="submit">
                                Modifica 
                            </Button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                        <p>Cambia la tua password</p>
                                    </div>
                                    <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="3">
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="3"> 
                                    <Card.Body>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Inserisci vecchia Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                title="Almeno 8 caratteri, una lettera maiuscola e un numero" 
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                placeholder="Password" 
                                id = 'password'
                                name = 'password'
                                onChange={this.onChange} 
                                required/>
                        </Form.Group>
                                    </Form.Row>
                                    <Form.Row>
                                    <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Nuova Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                title="Almeno 8 caratteri, una lettera maiuscola e un numero" 
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                placeholder="Password" 
                                id = 'password'
                                name = 'password'
                                onChange={this.onChange} 
                                required/>
                             </Form.Group>
                             <Form.Group as={Col} controlId="formGridPassword">
                        <Form.Label>Ripeti Password</Form.Label>
                            <Form.Control 
                                type="password" 
                                title="Almeno 8 caratteri, una lettera maiuscola e un numero" 
                                pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,}$"
                                placeholder="Password" 
                                id = 'password'
                                name = 'password'
                                onChange={this.onChange} 
                                required/>
                        </Form.Group>
                                    </Form.Row>
                                    <Button variant="primary" type="submit">
                                Modifica password
                            </Button>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card border="light">
                                    <div className="view-cont">
                                    <div className="sx-head">
                                        <p>Numero di telefono: {telefono}</p>
                                        </div>
                                        <Accordion.Toggle as={AiOutlineEdit} className="margin-right" variant="link" eventKey="4">
                                    </Accordion.Toggle>
                                    </div>
                                <Accordion.Collapse eventKey="4">
                                    <Card.Body>
                                        <Form.Row>
                                        <Form.Group as={Col} controlId="formGridIndirizzo">
                            <Form.Label>Telefono</Form.Label>
                            <Form.Control 
                                type = "tel" 
                                placeholder = "Telefono" 
                                id = 'telefono'
                                name = 'telefono'
                                onChange = {this.onChange} 
                                required
                            />
                        </Form.Group>
                                        </Form.Row>
                                        <Button variant="primary" type="submit">
                                Modifica numero
                            </Button>
                                    </Card.Body>

                                </Accordion.Collapse>
                        </Card>
                            </Accordion>
                            
                            
                
                
                            
                            </div>
                            </Form>
                            
                        
            );
        }
    }
}
export default DatiPersonali


function BottoneDati () {
    return(
        <button></button>
    )
}