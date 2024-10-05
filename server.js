// SIRVE PARA INICIALIZAR LA APLICACIÓN

const app = require('./app')

app.set('port', process.env.PORT || 3002)

app.listen(app.get('port'), () => {
    console.log('Arrancó la app por el puerto ' + app.get('port'))
})  //Se arranca el servidor
