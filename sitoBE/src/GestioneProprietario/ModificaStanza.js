import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form} from "react-bootstrap"

import "./InserimentoProprietà.css";



const ModificaStanza = ({ history }) => {
  const [Nome, setNome] = useState("");
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
      //presumo sia il setting della data di caricamento e nick del prop

    data.append("thumbnail", thumbnail);
    data.append("Nome", Nome);
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
        <h2>Compila questo form per modificare la tua stanza!</h2>
          <label htmlFor="Nome">Nome</label>
          <input
            type="text"
            id="Nome"
            value={Nome}
            placeholder="Nome della casa"
            onChange={e => setNome(e.target.value)}
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
            <label htmlFor="Prezzo">Prezzo</label>
          <input
            type="text"
            id="Prezzo"
            value={Prezzo}
            placeholder="Prezzo della casa vacanza"
            onChange={e => setPrezzo(e.target.value)}
            className="i"
          />

             <Form.Group controlId="PostiLetto">
            <Form.Label>PostiLetto</Form.Label>
            <Form.Control value={PostiLetto}  placeholder="Posti letto della casa vacanza" as="select"   onChange={e => setPostiLetto(e.target.value)}  >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
         
              </Form.Control>
          </Form.Group>

          <Form.Group>
            <label>Inserisci delle foto della tua struttura</label>
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
            </Form.Row>
            </Form.Group>
           
 
          <button type="submit" className="btn">
            Carica
          </button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default ModificaStanza;