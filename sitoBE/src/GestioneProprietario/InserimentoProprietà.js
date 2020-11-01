import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"

import "./InserimentoProprietà.css";


const InserimentoProprietà = ({ history }) => {
  const [Nome, setNome] = useState("");
  const [Città, setCittà] = useState("");
  const [Via, setVia] = useState("");
  const[Provincia,setProvincia]= useState("");
  const[Servizi,setServizi]=useState("");
  const [Prezzo, setPrezzo] = useState("");
  const[Descrizione, setDescrizione]=useState("");
  const[PostiLetto,setPostiLetto]=useState("");
  const [thumbnail, setThumbnail] = useState(null);

  const preview = useMemo(() => {
    return thumbnail ? URL.createObjectURL(thumbnail) : null;
  }, [thumbnail]);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = new FormData();
    const user_id = localStorage.getItem("user");     //presumo sia il setting della data di caricamento e nick del prop

    data.append("thumbnail", thumbnail);
    data.append("Nome", Nome);
    data.append("Città", Città);
    data.append("Via", Via);
    data.append("Provincia", Provincia);
    data.append("Servizi", Servizi);
    data.append("Descrizione", Descrizione);
    data.append("PostiLetto",PostiLetto);
    data.append("Prezzo", Prezzo);
  
    

   
  };

  return (
    <div className="background">
    <div className="containerNew">  
      <div className="contentNew">
        <form onSubmit={handleSubmit}>
          <h2>Compila questo form inserire la tua struttura!</h2>
          <label htmlFor="Nome">Nome</label>
          <input
            type="text"
            id="Nome"
            value={Nome}
            placeholder="Nome della casa"
            onChange={e => setNome(e.target.value)}
            className="i"
          />

          <label htmlFor="Città">Città</label>
          <input
            type="text"
            id="Città"
            value={Città}
            placeholder="Nome della città"
            onChange={e => setCittà(e.target.value)}
            className="i"
          />

          <label htmlFor="Via">Via</label>
          <input
            type="text"
            id="Via"
            value={Via}
            placeholder="indirizzo civico della casa"
            onChange={e => setVia(e.target.value)}
            className="i"
          />
           
           <label htmlFor="Provincia">Provincia</label>
          <input
            type="text"
            id="Provincia"
            value={Provincia}
            placeholder="Provincia della casa vacanza"
            onChange={e => setProvincia(e.target.value)}
            className="i"
          />

           <label htmlFor="Servizi">Servizi</label>
          <input
            type="text"
            id="Servizi"
            value={Servizi}
            placeholder="Elenco servizi"
            onChange={e => setServizi(e.target.value)}
            className="i"
          />
              <label htmlFor="Descrizione">Descrizione</label>
          <input
            type="text"
            id="Descrizione"
            value={Descrizione}
            placeholder="Descrizione della casa vacanza"
            onChange={e => setDescrizione(e.target.value)}
            className="i"
          />
       
             <Form.Group controlId="PostiLetto">
            <Form.Label>PostiLetto</Form.Label>
            <Form.Control value={PostiLetto}  placeholder="Posti letto della casa vacanza" as="select"   onChange={e => setPostiLetto(e.target.value)}  >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              </Form.Control>
          </Form.Group>
           
       
          <label htmlFor="Prezzo">Prezzo</label>
          <input
            type="text"
            id="Prezzo"
            value={Prezzo}
            placeholder="Prezzo della casa vacanza"
            onChange={e => setPrezzo(e.target.value)}
            className="i"
          />
          

          <hr/>
          
          <Form.Group>
            <Form.Row className="justify-content-center">
            <input
              type="file"
              className="inputImg"
            />
            <input
              type="file"
              className="inputImg"
            />
           <input
              type="file"
              className="inputImg"
            />
            <input
              type="file"
              className="inputImg"
            />
            <label>Seleziona il tipo di struttura che stai inserendo</label>
            
          </Form.Row>
          </Form.Group>
          <Form.Group>
            <Form.Row className="justify-content-center">
            <Button variant="primary" className="bottoniScelta">
              Casa Vacanza
            </Button>
            <Button variant="primary" className="bottoniScelta">
              B&B
            </Button>
            </Form.Row>
          </Form.Group>

          <Button variant="primary" type="submit">
            Carica
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default InserimentoProprietà;
