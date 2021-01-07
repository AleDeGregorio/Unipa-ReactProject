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

// utility function for table "proprieta"

// return all table
const all = async () => {
    return new Promise((resolve, reject) => {

        Connection.query('SELECT * FROM proprieta', (err, results) => {
            if(err) {
                console.log(err);
                return reject(new GeneralError('Si è verificato un errore'));
            }
            if(results.length < 1) {
                return reject(new NotFound('Nessuna proprietà registrata'));
            }
            resolve(results);
        });
    });
}

// get proprieta from id_proprieta
const getProprieta = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE id_proprieta = ' +  req.id_proprieta + '; ', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessuna proprietà trovata'));
                }
            resolve(results);
        });
    });
}

// get proprieta from nome_proprieta
const getProprietaNome = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE nome_proprieta = "' +  req.nome_proprieta + '"', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from localita
const getProprietaLocalita = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '"', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from provincia
const getProprietaProvincia = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '"', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta
const getProprietaTipo = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE tipo_proprieta = "' +  req.tipo_proprieta + '"', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta = cv && ref_proprietario
const getProprietaCVProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta, casa_vacanza ' +
            'WHERE id_proprieta = ref_proprieta_cv AND ' +
            'tipo_proprieta = "' +  req.tipo_proprieta + '" AND ref_proprietario = "' + req.ref_proprietario + '"; ', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta = bb && ref_proprietario
const getProprietaBBProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta, b_and_b ' +
            'WHERE id_proprieta = ref_proprieta_bb AND ' +
            'tipo_proprieta = "' +  req.tipo_proprieta + '" AND ref_proprietario = "' + req.ref_proprietario + '"; ', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from servizi
const getProprietaServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE servizi = "' +  req.servizi + '"', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from ref_proprietario
const getProprietaProprietario = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE ref_proprietario = "' +  req.ref_proprietario + '"', (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from localita && tipo_proprieta
const getProprietaLocalitaTipo = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '" AND tipo_proprieta = "' + req.tipo_proprieta + '"', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from provincia && tipo_proprieta
const getProprietaProvinciaTipo = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '" AND tipo_proprieta = "' + req.tipo_proprieta + '"', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from localita && servizi
const getProprietaLocalitaServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '" AND servizi = "' + req.servizi + '"', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from provincia && servizi
const getProprietaProvinciaServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '" AND servizi = "' + req.servizi + '"', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from tipo_proprieta && servizi
const getProprietaTipoServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE tipo_proprieta = "' +  req.tipo_proprieta + '" AND servizi = "' + req.servizi + '"', 
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from localita && tipo_proprieta && servizi
const getProprietaLocalitaTipoServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE localita = "' +  req.localita + '" AND tipo_proprieta = "' + req.tipo_proprieta + '" AND servizi = "' + req.servizi + '"',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// get proprieta from provincia && tipo_proprieta && servizi
const getProprietaProvinciaTipoServizi = async(req) => {
    return new Promise((resolve, reject) => {

        Connection.query(
            'SELECT * ' +
            'FROM proprieta ' +
            'WHERE provincia = "' +  req.provincia + '" AND tipo_proprieta = "' + req.tipo_proprieta + '" AND servizi = "' + req.servizi + '"',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
            resolve(results);
        });
    });
}

// elaborazione del form di ricerca di un alloggio, nel caso più generale
// ----------METODO PRINCIPALE DA USARE PER LA RICERCA----------
const ricercaAlloggio = async(req) => {
    var str1 = req.checkIn === '' ? '1970-01-01' : req.checkIn;
    var dmy1 = str1.split("/");

    var str2 = req.checkOut === '' ? '1970-01-01' : req.checkOut
    var dmy2 = str2.split("/");

    var partenza = new Date(dmy1[2], dmy1[1] - 1, dmy1[0]);
    var ritorno = new Date(dmy2[2], dmy2[1] - 1, dmy2[0]);

    const utc1 = Date.UTC(partenza.getFullYear(), partenza.getMonth(), partenza.getDate());
    const utc2 = Date.UTC(ritorno.getFullYear(), ritorno.getMonth(), ritorno.getDate());

    var ngiorni = Math.floor((utc2 - utc1) / (1000 * 60 * 60 * 24));
    
    if(!ngiorni || ngiorni < 1) {
        ngiorni = 1;
    }
    
    var servizi = '%';

    for(var i = 0; i < req.servizi.length; i++) {
        servizi = servizi + req.servizi[i] + '%';
    }

    return new Promise((resolve, reject) => {

        if(req.tipo === 'cv') {
            Connection.query(
                'SELECT @localita := "' + (req.localita === '' ? '%%' : req.localita) + '"; ' +
                'SELECT @provincia := "' + (req.provincia === '' ? '%%' : req.provincia) + '"; ' +
                'SELECT @posti := "' + req.posti + '"; ' +
                'SELECT @costo := ' + (req.costo === '' ? 99999 : req.costo) + '; ' +
                'SELECT @inizio := "'+ (req.checkIn === '' ? '1970-01-01' : req.checkIn) + '"; ' +
                'SELECT @fine := "'+ (req.checkOut === '' ? '1970-01-01' : req.checkOut) + '"; ' +
                'SELECT @servizi := "' + servizi + '"; ' +
                'SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, p.servizi, p.provincia, ' +
                    'c.tariffa_casa* ' + ngiorni + ' AS costo, ' +
                    'c.tariffa_casa AS tariffa, ' +
                    ngiorni + ' AS ngiorni, ' +
                    'c.posti_letto AS posti, p.descrizione, ' +
                    'c.imgCV_path1 AS img1, ' +
                    'c.imgCV_path2 AS img2, ' +
                    'c.imgCV_path3 AS img3, ' +
                    'c.imgCV_path4 AS img4, ' +
                    'null AS check_in, ' +
                    'null AS check_out ' +
                'FROM proprieta p, casa_vacanza c ' +
                'WHERE p.id_proprieta = c.ref_proprieta_cv AND ' +
                    'LOWER(p.localita) LIKE LOWER(@localita) AND LOWER(p.provincia) LIKE LOWER(@provincia) AND ' +
                    'LOWER(p.servizi) LIKE LOWER(@servizi) AND ' +
                    'c.posti_letto LIKE @posti AND ' +
                    '(@fine <= c.non_disponibile_inizio_cv OR @inizio >= c.non_disponibile_fine_cv) ' +
                'HAVING c.tariffa_casa*' + ngiorni + ' <= @costo; ',
                (err, results) => {
                    if(err) {
                        console.log(err);
                        return reject(new GeneralError('Si è verificato un errore'));
                    }
                    if(results.length < 1) {
                        return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                    }
                    resolve(results[7]);
                }
            );
        }

        else if(req.tipo === 'bb') {
            Connection.query(
                'SELECT @localita := "' + (req.localita === '' ? '%%' : req.localita) + '"; ' +
                'SELECT @provincia := "' + (req.provincia === '' ? '%%' : req.provincia) + '"; ' +
                'SELECT @posti := "' + req.posti + '"; ' +
                'SELECT @costo := ' + (req.costo === '' ? 99999 : req.costo) + '; ' +
                'SELECT @inizio := "'+ (req.checkIn === '' ? '1970-01-01' : req.checkIn) + '"; ' +
                'SELECT @fine := "'+ (req.checkOut === '' ? '1970-01-01' : req.checkOut) + '"; ' +
                'SELECT @servizi := "' + servizi + '"; ' +
                'SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, p.servizi, p.provincia, ' +
                    's.tariffa_stanza* ' + ngiorni + ' AS costo, ' +
                    's.tariffa_stanza AS tariffa, ' +
                    ngiorni + ' AS ngiorni, ' +
                    's.tipologia AS posti, p.descrizione, ' +
                    's.imgST_path1 AS img1, ' +
                    's.imgST_path2 AS img2, ' +
                    's.imgST_path3 AS img3, ' +
                    's.imgST_path4 AS img4, ' +
                    'b.check_in AS check_in, ' +
                    'b.check_out AS check_out ' +
                'FROM proprieta p, b_and_b b, stanza s ' +
                'WHERE p.id_proprieta = b.ref_proprieta_bb AND b.ref_proprieta_bb = s.ref_bb AND ' +
                    'LOWER(p.localita) LIKE LOWER(@localita) AND LOWER(p.provincia) LIKE LOWER(@provincia) AND ' +
                    'LOWER(p.servizi) LIKE LOWER(@servizi) AND ' +
                    's.tipologia LIKE @posti AND ' +
                    '(@fine <= s.non_disponibile_inizio_st OR @inizio >= s.non_disponibile_fine_st) ' +
                'HAVING s.tariffa_stanza*' + ngiorni + ' <= @costo; ',
                (err, results) => {
                    if(err) {
                        console.log(err);
                        return reject(new GeneralError('Si è verificato un errore'));
                    }
                    if(results.length < 1) {
                        return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                    }
                    
                    resolve(results[7]);
                }
            );
        }

        else {
            Connection.query(
                'SELECT @localita := "' + (req.localita === '' ? '%%' : req.localita) + '"; ' +
                'SELECT @provincia := "' + (req.provincia === '' ? '%%' : req.provincia) + '"; ' +
                'SELECT @posti := "' + req.posti + '"; ' +
                'SELECT @costo := ' + (req.costo === '' ? 99999 : req.costo) + '; ' +
                'SELECT @inizio := "'+ (req.checkIn === '' ? '1970-01-01' : req.checkIn) + '"; ' +
                'SELECT @fine := "'+ (req.checkOut === '' ? '1970-01-01' : req.checkOut) + '"; ' +
                'SELECT @servizi := "' + servizi + '"; ' +
                'SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, p.servizi, p.provincia, ' +
                    'c.tariffa_casa* ' + ngiorni + ' AS costo, ' +
                    'c.tariffa_casa AS tariffa, ' +
                    ngiorni + ' AS ngiorni, ' +
                    'c.posti_letto AS posti, p.descrizione, ' +
                    'c.imgCV_path1 AS img1, ' +
                    'c.imgCV_path2 AS img2, ' +
                    'c.imgCV_path3 AS img3, ' +
                    'c.imgCV_path4 AS img4, ' +
                    'null AS check_in, ' +
                    'null AS check_out ' +
                'FROM proprieta p, casa_vacanza c ' +
                'WHERE p.id_proprieta = c.ref_proprieta_cv AND ' +
                    'LOWER(p.localita) LIKE LOWER(@localita) AND LOWER(p.provincia) LIKE LOWER(@provincia) AND ' +
                    'LOWER(p.servizi) LIKE LOWER(@servizi) AND ' + 
                    'c.posti_letto LIKE @posti AND ' +
                    '(@fine <= c.non_disponibile_inizio_cv OR @inizio >= c.non_disponibile_fine_cv) ' +
                'HAVING c.tariffa_casa*' + ngiorni + ' <= @costo; ',
                (err, results) => {
                    var resCV = results[7];

                    if(err) {
                        console.log(err);
                        return reject(new GeneralError('Si è verificato un errore'));
                    }
                    if(results.length < 1) {
                        return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                    }
                    
                    Connection.query(
                        'SELECT @localita := "' + (req.localita === '' ? '%%' : req.localita) + '"; ' +
                        'SELECT @provincia := "' + (req.provincia === '' ? '%%' : req.provincia) + '"; ' +
                        'SELECT @posti := "' + req.posti + '"; ' +
                        'SELECT @costo := ' + (req.costo === '' ? 99999 : req.costo) + '; ' +
                        'SELECT @inizio := "'+ (req.checkIn === '' ? '1970-01-01' : req.checkIn) + '"; ' +
                        'SELECT @fine := "'+ (req.checkOut === '' ? '1970-01-01' : req.checkOut) + '"; ' +
                        'SELECT @servizi := "' + servizi + '"; ' +
                        'SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, p.provincia, ' +
                            's.tariffa_stanza* ' + ngiorni + ' AS costo, ' +
                            's.tariffa_stanza AS tariffa, ' +
                            ngiorni + ' AS ngiorni, ' +
                            's.tipologia AS posti, p.descrizione, ' +
                            's.imgST_path1 AS img1, ' +
                            's.imgST_path2 AS img2, ' +
                            's.imgST_path3 AS img3, ' +
                            's.imgST_path4 AS img4, ' +
                            'b.check_in AS check_in, ' +
                            'b.check_out AS check_out ' +
                        'FROM proprieta p, b_and_b b, stanza s ' +
                        'WHERE p.id_proprieta = b.ref_proprieta_bb AND b.ref_proprieta_bb = s.ref_bb AND ' +
                            'LOWER(p.localita) LIKE LOWER(@localita) AND LOWER(p.provincia) LIKE LOWER(@provincia) AND ' +
                            'LOWER(p.servizi) LIKE LOWER(@servizi) AND ' +
                            's.tipologia LIKE @posti AND ' +
                            '(@fine <= s.non_disponibile_inizio_st OR @inizio >= s.non_disponibile_fine_st) ' +
                        'HAVING s.tariffa_stanza*' + ngiorni + ' <= @costo; ',
                        (err, results) => {
                            if(err) {
                                console.log(err);
                                return reject(new GeneralError('Si è verificato un errore'));
                            }
                            if(results.length < 1) {
                                return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                            }
                            
                            var resBB = results[7];

                            var resTot = resCV.concat(resBB);

                            resolve(resTot);
                        }
                    );
                }
            );
        }
        
        /*Connection.query(
            'SELECT @tipo := "' + (req.tipo == '' ? '%%' : req.tipo) + '"; ' +
            'SELECT @localita := "' + (req.localita == '' ? '%%' : req.localita) + '"; ' +
            'SELECT @provincia := "' + (req.provincia == '' ? '%%' : req.provincia) + '"; ' +
            'SELECT @posti := ' + req.posti + '; ' +
            'SELECT @tariffa := ' + (req.tariffa == '' ? 99999 : req.tariffa) + '; ' +
            'SELECT @inizio := "'+ (req.checkIn == '' ? '1970-01-01' : req.checkIn) + '"; ' +
            'SELECT @fine := "'+ (req.checkOut == '' ? '1970-01-01' : req.checkOut) + '"; ' +
            'SELECT DISTINCT p.nome_proprieta, p.indirizzo, p.localita, p.tipo_proprieta, ' +
                'IF(@tipo = "cv", c.tariffa_casa, s.tariffa_stanza) AS tariffa, ' +
                'IF(@tipo = "cv", c.posti_letto, s.tipologia) AS posti, p.descrizione, ' +
                'IF(@tipo = "cv", c.imgCV_path1, s.imgST_path1) AS img1, ' +
                'IF(@tipo = "cv", c.imgCV_path2, s.imgST_path2) AS img2, ' +
                'IF(@tipo = "cv", c.imgCV_path3, s.imgST_path3) AS img3, ' +
                'IF(@tipo = "cv", c.imgCV_path4, s.imgST_path4) AS img4, ' +
                'IF(@tipo = "bb", b.check_in, null) AS check_in, ' +
                'IF(@tipo = "bb", b.check_out, null) AS check_out ' +
            'FROM proprieta p, casa_vacanza c, b_and_b b, stanza s ' +
            'WHERE p.id_proprieta = IF(@tipo = "cv", c.ref_proprieta_cv, b.ref_proprieta_bb) AND b.ref_proprieta_bb = s.ref_bb AND ' +
                'p.localita LIKE @localita AND p.provincia LIKE @provincia AND ' +
                'p.tipo_proprieta LIKE @tipo AND ' +
                '(c.posti_letto >= @posti OR s.tipologia >= @posti) AND (c.tariffa_casa <= @tariffa OR s.tariffa_stanza <= @tariffa) AND ' +
                '(((@inizio <= c.non_disponibile_inizio_cv AND @fine <= c.non_disponibile_fine_cv) OR (@inizio >= c.non_disponibile_inizio_cv AND @fine >= c.non_disponibile_fine_cv)) ' +
                'AND ((@inizio <= s.non_disponibile_inizio_st AND @fine <= s.non_disponibile_inizio_st) OR (@inizio >= s.non_disponibile_inizio_st AND @fine >= s.non_disponibile_fine_st)));',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Nessun alloggio corrisponde alla ricerca'));
                }
                
                resolve(results[7]);
            }
        )*/
    });
}

// update fields
const updateProprieta= async(req) => {

    var servizi = '';
    for(var i = 0; i < req.servizi.length; i++) {
        if(i < req.servizi.length-1) {
            servizi = servizi + req.servizi[i] + ', ';
        }
        else {
            servizi = servizi + req.servizi[i];
        }
    }
    
    return new Promise((resolve, reject) => {

        Connection.query(
            'UPDATE proprieta ' +
            'SET nome_proprieta = "' + req.nome_proprieta + '", indirizzo = "' + req.indirizzo +
            '", localita = "' + req.localita + '", provincia = "' + req.provincia +
            '", tipo_proprieta = "' + req.tipo_proprieta + '", servizi = "' + req.servizi + '", ref_proprietario = "' + req.ref_proprietario +
            '", descrizione = "' + req.descrizione + '" ' +
            'WHERE id_proprieta= ' + req.id_proprieta+ '; ',
            (err, results) => {
                if(err) {
                    console.log(err);
                    return reject(new GeneralError('Si è verificato un errore'));
                }
                if(results.length < 1) {
                    return reject(new NotFound('Proprietà non trovata'));
                }
                resolve(results);
            }
        );
    });
}

// insert new proprieta
const insertProprieta = async(req) => {

    var servizi = '';
    for(var i = 0; i < req.servizi.length; i++) {
        if(i < req.servizi.length-1) {
            servizi = servizi + req.servizi[i] + ', ';
        }
        else {
            servizi = servizi + req.servizi[i];
        }
    }

    return new Promise((resolve, reject) => {

        Connection.query(
            'INSERT INTO proprieta (nome_proprieta, indirizzo, localita, provincia, tipo_proprieta, servizi, ref_proprietario, descrizione) VALUES ' +
            '("' + req.nome_proprieta + '", "' + req.indirizzo + '", "' + req.localita + '", "' + req.provincia +
            '", "' + req.tipo_proprieta + '", "' + servizi + '", "' +
            req.ref_proprietario + '", "' + req.descrizione + '"); ',
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

module.exports = all;
module.exports = getProprieta;
module.exports = getProprietaNome;
module.exports = getProprietaLocalita;
module.exports = getProprietaProvincia;
module.exports = getProprietaTipo;
module.exports = getProprietaCVProprietario;
module.exports = getProprietaBBProprietario
module.exports = getProprietaServizi;
module.exports = getProprietaProprietario;
module.exports = getProprietaLocalitaTipo;
module.exports = getProprietaProvinciaTipo;
module.exports = getProprietaLocalitaServizi;
module.exports = getProprietaProvinciaServizi;
module.exports = getProprietaTipoServizi;
module.exports = getProprietaLocalitaTipoServizi;
module.exports = getProprietaProvinciaTipoServizi;
module.exports = ricercaAlloggio;
module.exports = updateProprieta;
module.exports = insertProprieta;

module.exports = {
    all,
    getProprieta,
    getProprietaNome,
    getProprietaLocalita,
    getProprietaProvincia,
    getProprietaTipo,
    getProprietaCVProprietario,
    getProprietaBBProprietario,
    getProprietaServizi,
    getProprietaProprietario,
    getProprietaLocalitaTipo,
    getProprietaProvinciaTipo,
    getProprietaLocalitaServizi,
    getProprietaProvinciaServizi,
    getProprietaTipoServizi,
    getProprietaLocalitaTipoServizi,
    getProprietaProvinciaTipoServizi,
    ricercaAlloggio,
    updateProprieta,
    insertProprieta
}