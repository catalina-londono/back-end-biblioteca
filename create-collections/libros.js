db.libros.insertMany([
    {
    "codigo" : "1",
    "titulo" : "Calculo I" ,
    "ISBN" : "978-84",
    "editorial" : {
        "_id" : "66f77a953ea5075db9d207d5"
    },
    "autores": [
    {
        "_id" : "66f77ef25e125ff2138481dc"
    },
    {
        "_id" : "66f77ef25e125ff2138481dd"
    }
    ],
    "paginas": 1100,
    "fechaCreacion" : new Date(),
    "fechaActualizacion" : null
    },
    {
    "codigo" : "2",
    "titulo" : "Quimica Avanzada" ,
    "ISBN" : "978-85",
    "editorial" : {
            "_id" : "66f77a953ea5075db9d207d7"
    },
    "autores": [
    {
            "_id" : "66f77ef25e125ff2138481dc"
    },
    {
            "_id" : "66f77ef25e125ff2138481de"
    }
    ],
    "paginas": 5321,
    "fechaCreacion" : new Date(),
    "fechaActualizacion" : null
    },
    {
    "codigo" : "3",
    "titulo" : "Calculo II" ,
    "ISBN" : "578-84",
    "editorial" : {
                "_id" : "66f77a953ea5075db9d207d5"
        },
    "autores": [
    {
                "_id" : "66f77ef25e125ff2138481dc"
    },
    {
                "_id" : "66f77ef25e125ff2138481dd"
    }
        ],
    "paginas": 1200,
    "fechaCreacion" : new Date(),
    "fechaActualizacion" : null
    } 
]) 