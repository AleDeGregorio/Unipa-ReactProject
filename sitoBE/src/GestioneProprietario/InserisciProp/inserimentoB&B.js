/*CSS FATTO*/ 

import React, { useState, useMemo } from "react";
import camera from "../assets/camera.svg";   
import {Form, Button} from "react-bootstrap"
import {Link} from "react-router-dom"

import "./InserimentoProprietà.css";

const InserimentoBnB = ({ history }) => {
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
          <h2>Compila questo form inserire il tuo B&B!</h2>
          <label htmlFor="Nome">Check-in</label>
          <input
            type="text"
            id="Check-in"
            value={Nome}
            placeholder="Orario check-in"
            className="i"
          />

          <label htmlFor="Città">Check-out</label>
          <input
            type="text"
            id="Check-out"
            value={Città}
            placeholder="Orario check-out"
            className="i"
          />
          <Link to="/InserimentoProprietà">Torna indietro</Link>
          <Button variant="primary" type="submit">
            Carica
          </Button>
        </form>
      </div>
    </div>
    </div>
  );
};

export default InserimentoBnB;