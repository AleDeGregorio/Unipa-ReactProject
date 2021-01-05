// connection to mysql db
var mysql = require('mysql');
var Connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'user',
    database: 'progetto',
    password: 'user',
    multipleStatements: true
});

Connection.connect(function(err) {
    if(err) throw err;
});

//requiring custom errors 
var { GeneralError, BadRequest, NotFound } = require('../utils/errors');

// utility function for table "prenotazione"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM prenotazione', (err, results) => {
            if(err) {
                console.log(err);
                return reject(new GeneralError('Si è verificato un errore'));
            }
            if(results.length < 1) {
                return reject(new NotFound('Nessuna prenotazione registrata'));
            }
            resolve(results);
        });
    });
}

// get prenotazione from id_prenotazione
const getPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE id_prenotazione = ' +  req.id_prenotazione + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }
            resolve(results);
        });
    });
}

// get prenotazione from ref_soggiornante
const getPrenotazioneSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_soggiornante = "' +  req.ref_soggiornante + '"',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna prenotazione relativa al soggiornante'));
                }
            resolve(results);
        });
    });
}

// get prenotazione from ref_cliente
const getPrenotazioneCliente = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione, proprieta, soggiornante ' +
            'WHERE ref_cliente = "' +  req.ref_cliente + '" AND ref_proprieta = id_proprieta AND ref_soggiornante = cf_sogg',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna prenotazione relativa al cliente'));
                }

            var res1 = results;
            
            if(res1[0].tipo_proprieta === 'cv') {
                Connection.query(
                    'SELECT * ' + 
                    'FROM casa_vacanza ' +
                    'WHERE ref_proprieta_cv = ' + res1[0].id_proprieta + '; ',
                    (err, results) => {
                        if(err) {
                            console.log(err);
                            return reject(new GeneralError('Si è verificato un errore'));
                        }
                        if(results.length < 1) {
                            return reject(new NotFound('Casa vacanza non trovata'));
                        }

                        for(var i = 0; i < res1.length; i++) {
                            res1[i].img = results[0].imgCV_path1;
                        }

                        resolve(res1);
                    }
                )
            }
            else {
                Connection.query(
                    'SELECT * ' +
                    'FROM b_and_b, stanza ' +
                    'WHERE ref_proprieta_bb = ' + res1[0].id_proprieta + ' AND ref_proprieta_bb = ref_bb ',
                    (err, results) => {
                        if(err) {
                            console.log(err);
                            return reject(new GeneralError('Si è verificato un errore'));
                        }
                        if(results.length < 1) {
                            return reject(new NotFound('B&B non trovato'));
                        }

                        for(var i = 0; i < res1.length; i++) {
                            res1[i].img = results[0].imgST_path1;
                            res1[i].id_stanza = results[i].id_stanza;
                        }
                        resolve(res1);
                    }
                )
            }
        });
    });
}

// get prenotazione from ref_proprietario
const getPrenotazioneProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_proprietario = "' +  req.ref_proprietario + '"',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna prenotazione relativa al proprietario'));
                }
            resolve(results);
        });
    });
}

// get prenotazione from ref_proprieta
const getPrenotazioneProprieta = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione ' +
            'WHERE ref_proprieta = ' +  req.ref_proprieta + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound("Nessuna prenotazione relativa all'alloggio"));
                }
            resolve(results);
        });
    });
}

// get prenotazioni da accettare from ref_proprietario
const getPrenotazioneAccettazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione, proprieta ' +
            'WHERE prenotazione.ref_proprietario = "' + req.ref_proprietario + '" AND accettata IS NULL AND ref_proprieta = id_proprieta;',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna prenotazione da accettare'));
                }

                var res1 = results;
            
                if(res1[0].tipo_proprieta === 'cv') {
                    Connection.query(
                        'SELECT * ' + 
                        'FROM casa_vacanza ' +
                        'WHERE ref_proprieta_cv = ' + res1[0].id_proprieta + '; ',
                        (err, results) => {
                            if(err) {
                                console.log(err);
                                return reject(new GeneralError('Si è verificato un errore'));
                            }
                            if(results.length < 1) {
                                return reject(new NotFound('Casa vacanza non trovata'));
                            }

                            for(var i = 0; i < res1.length; i++) {
                                res1[i].img = results[0].imgCV_path1;
                            }

                            resolve(res1);
                        }
                    )
                }
                else {
                    Connection.query(
                        'SELECT * ' +
                        'FROM b_and_b, stanza ' +
                        'WHERE ref_proprieta_bb = ' + res1[0].id_proprieta + ' AND ref_proprieta_bb = ref_bb ',
                        (err, results) => {
                            if(err) {
                                console.log(err);
                                return reject(new GeneralError('Si è verificato un errore'));
                            }
                            if(results.length < 1) {
                                return reject(new NotFound('B&B non trovato'));
                            }

                            for(var i = 0; i < res1.length; i++) {
                                res1[i].img = results[0].imgST_path1;
                                res1[i].id_stanza = results[i].id_stanza;
                            }
                            console.log(res1);
                            resolve(res1);
                        }
                    )
                }
            }
        );
    });
}

// get prenotazioni già accettate from ref_proprietario
const getPrenotazioneAccettata = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione, proprieta ' +
            'WHERE prenotazione.ref_proprietario = "' + req.ref_proprietario + '" AND accettata = true AND ref_proprieta = id_proprieta;',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                /*if(results.length < 1) {
                    return reject(new NotFound('Nessuna prenotazione accettata'));
                }*/

                if(results.length < 1) {
                    resolve(results);
                }
                
                else {
                    var res1 = results;
                
                    if(res1[0].tipo_proprieta === 'cv') {
                        Connection.query(
                            'SELECT * ' + 
                            'FROM casa_vacanza ' +
                            'WHERE ref_proprieta_cv = ' + res1[0].id_proprieta + '; ',
                            (err, results) => {
                                if(err) {
                                    console.log(err);
                                    return reject(new GeneralError('Si è verificato un errore'));
                                }
                                if(results.length < 1) {
                                    return reject(new NotFound('Casa vacanza non trovata'));
                                }

                                for(var i = 0; i < res1.length; i++) {
                                    res1[i].img = results[0].imgCV_path1;
                                }

                                resolve(res1);
                            }
                        )
                    }
                    else {
                        Connection.query(
                            'SELECT * ' +
                            'FROM b_and_b, stanza ' +
                            'WHERE ref_proprieta_bb = ' + res1[0].id_proprieta + ' AND ref_proprieta_bb = ref_bb ',
                            (err, results) => {
                                if(err) {
                                    console.log(err);
                                    return reject(new GeneralError('Si è verificato un errore'));
                                }
                                if(results.length < 1) {
                                    return reject(new NotFound('B&B non trovato'));
                                }

                                for(var i = 0; i < res1.length; i++) {
                                    res1[i].img = results[0].imgST_path1;
                                    res1[i].id_stanza = results[i].id_stanza;
                                }

                                resolve(res1);
                            }
                        )
                    }
                }
            }
        );
    });
}

// accetta prenotazione in pendenza
const accettaPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE prenotazione ' +
            'SET accettata = true ' +
            'WHERE id_prenotazione = ' + req.id_prenotazione + '; ', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }

                if(req.tipo_proprieta === 'cv') {
                    Connection.query(
                        'UPDATE casa_vacanza ' +
                        'SET non_disponibile_inizio_cv = (STR_TO_DATE("' + req.data_partenza + '","%d/%m/%Y")), non_disponibile_fine_cv = (STR_TO_DATE("' + req.data_ritorno + '","%d/%m/%Y")) ' +
                        'WHERE ref_proprieta_cv = ' + req.ref_proprieta + '; ',
                        (err, results) => {
                            if(err) {
                                console.log(err);
                                return reject(new GeneralError('Si è verificato un errore'));
                            }
                            if(results.length < 1) {
                                return reject(new NotFound('Casa vacanza non trovata'));
                            }

                            resolve(results);
                        }
                    );
                }
                else {
                    Connection.query(
                        'UPDATE stanza ' + 
                        'SET non_disponibile_inizio_st = (STR_TO_DATE("' + req.data_partenza + '","%d/%m/%Y")), non_disponibile_fine_st= (STR_TO_DATE("' + req.data_ritorno + '","%d/%m/%Y")) ' +
                        'WHERE id_stanza = ' + req.id_stanza + '; ',
                        (err, results) => {
                            if(err) {
                                console.log(err);
                                return reject(new GeneralError('Si è verificato un errore'));
                            }
                            if(results.length < 1) {
                                return reject(new NotFound('Stanza non trovata'));
                            }

                            resolve(results);
                        }
                    );
                }
            }
        );
    });
}

// rifiuta prenotazione in pendenza
const rifiutaPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE prenotazione ' +
            'SET accettata = false ' +
            'WHERE id_prenotazione = ' + req.id_prenotazione + '; ', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }

                resolve(results);
            }
        );
    });
}

// get prenotazioni rifiutate from ref_proprietario
const getPrenotazioneRifiutata = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM prenotazione, proprieta ' +
            'WHERE prenotazione.ref_proprietario = "' + req.ref_proprietario + '" AND accettata = false AND ref_proprieta = id_proprieta;',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                /*if(results.length < 1) {
                    return reject(new NotFound('Nessuna prenotazione accettata'));
                }*/

                if(results.length < 1) {
                    resolve(results);
                }
                
                else {
                    var res1 = results;
                
                    if(res1[0].tipo_proprieta === 'cv') {
                        Connection.query(
                            'SELECT * ' + 
                            'FROM casa_vacanza ' +
                            'WHERE ref_proprieta_cv = ' + res1[0].id_proprieta + '; ',
                            (err, results) => {
                                if(err) {
                                    console.log(err);
                                    return reject(new GeneralError('Si è verificato un errore'));
                                }
                                if(results.length < 1) {
                                    return reject(new NotFound('Casa vacanza non trovata'));
                                }

                                for(var i = 0; i < res1.length; i++) {
                                    res1[i].img = results[0].imgCV_path1;
                                }

                                resolve(res1);
                            }
                        )
                    }
                    else {
                        Connection.query(
                            'SELECT * ' +
                            'FROM b_and_b, stanza ' +
                            'WHERE ref_proprieta_bb = ' + res1[0].id_proprieta + ' AND ref_proprieta_bb = ref_bb ',
                            (err, results) => {
                                if(err) {
                                    console.log(err);
                                    return reject(new GeneralError('Si è verificato un errore'));
                                }
                                if(results.length < 1) {
                                    return reject(new NotFound('B&B non trovato'));
                                }

                                for(var i = 0; i < res1.length; i++) {
                                    res1[i].img = results[0].imgST_path1;
                                    res1[i].id_stanza = results[i].id_stanza;
                                }

                                resolve(res1);
                            }
                        )
                    }
                }
            }
        );
    });
}

// update fields
const updatePrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE prenotazione ' +
            'SET ref_soggiornante = "' + req.ref_soggiornante + '", ref_cliente = "' + req.ref_cliente +
            '", ref_proprietario = "' + req.ref_proprietario + '", ref_proprieta = ' + req.ref_proprieta +
            ', num_soggiornanti = ' + req.num_soggiornanti + ', costo = ' + req.costo + ', caparra = ' + req.caparra +
            ', data_partenza = (STR_TO_DATE("' + req.data_partenza + '","%d/%m/%Y")), data_ritorno = (STR_TO_DATE("' + req.data_ritorno + '","%d/%m/%Y")), accettata = ' + req.accettata + ' ' +
            'WHERE id_prenotazione = ' + req.id_prenotazione + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }
                resolve(results);
            }
        );
    })
}

// update date prenotazione
const updateDatePrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'UDATE prenotazione ' +
            'SET data_partenza = (STR_TO_DATE("' + req.data_partenza + '","%d/%m/%Y")), data_ritorno = (STR_TO_DATE("' + req.data_ritorno + '","%d/%m/%Y")), accettata = null ' +
            'WHERE id_prenotazione = ' + req.id_prenotazione + '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }
                resolve(results);
            }
        );
    })
}

// insert new prenotazione
const insertPrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO prenotazione (ref_soggiornante, ref_cliente, ref_proprietario, ref_proprieta, num_soggiornanti, ' +
                'costo, caparra, data_partenza, data_ritorno, accettata) VALUES ' +
            '("' + req.ref_soggiornante + '", "' + req.ref_cliente + '", "' + req.ref_proprietario + '", ' + req.ref_proprieta + 
            ', ' + req.num_soggiornanti + ', ' + req.costo + ', ' + req.caparra + ', (STR_TO_DATE("' + req.data_partenza + '","%d/%m/%Y")), ' + 
            '(STR_TO_DATE("' + req.data_ritorno + '","%d/%m/%Y")), null)',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new BadRequest("Si è verificato un errore nell'inserimento"));
                }
                resolve(results);
        });
    });
}

// delete prenotazione
const deletePrenotazione = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'DELETE FROM prenotazione WHERE id_prenotazione = ' + req.id_prenotazione + ';',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Prenotazione non trovata'));
                }
                resolve(results);
            }
        )
    })
}

// controllo vincolo 28 giorni
const checkSoggiornante = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT @sogg := "' + req.ref_soggiornante + '"; ' +
            'SELECT @anno := ' + req.anno + '; ' +
            'SELECT pre.id_prenotazione, pre.ref_soggiornante, pre.data_partenza, pre.data_ritorno, SUM(pre.data_ritorno - pre.data_partenza) AS tot_giorni ' +
            'FROM prenotazione pre, proprieta pro ' + 
            'WHERE pre.ref_proprieta = pro.id_proprieta AND ' +
            'pro.tipo_proprieta = "cv" AND pre.ref_soggiornante = @sogg AND ' +
            'YEAR(pre.data_ritorno) = @anno ' +
            'GROUP BY pre.ref_soggiornante, YEAR(pre.data_ritorno);',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna corrispondenza trovata'));
                }
                else {
                    if(results[0].tot_giorni > 27) {
                        return reject(new BadRequest('Il soggiornante ha superato il vincolo dei 28 giorni'));
                    }
                    else {
                        console.log('Il soggiornante è idoneo alla prenotazione');
                        resolve(results);
                    }

                }
            }
        )
    })
}

module.exports = all;
module.exports = getPrenotazione;
module.exports = getPrenotazioneSoggiornante;
module.exports = getPrenotazioneCliente;
module.exports = getPrenotazioneProprietario;
module.exports = getPrenotazioneProprieta;
module.exports = getPrenotazioneAccettazione;
module.exports = getPrenotazioneAccettata;
module.exports = accettaPrenotazione;
module.exports = rifiutaPrenotazione;
module.exports = getPrenotazioneRifiutata;
module.exports = updatePrenotazione;
module.exports = updateDatePrenotazione;
module.exports = deletePrenotazione;
module.exports = insertPrenotazione;
module.exports = checkSoggiornante;

module.exports = {
    all,
    getPrenotazione,
    getPrenotazioneSoggiornante,
    getPrenotazioneCliente,
    getPrenotazioneProprietario,
    getPrenotazioneProprieta,
    getPrenotazioneAccettazione,
    getPrenotazioneAccettata,
    accettaPrenotazione,
    rifiutaPrenotazione,
    getPrenotazioneRifiutata,
    updatePrenotazione,
    updateDatePrenotazione,
    deletePrenotazione,
    insertPrenotazione,
    checkSoggiornante
}