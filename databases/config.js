const mongoose = require('mongoose') // Importar mongoose


const mongoConnect = async() => {
   try {
    await mongoose.connect(process.env.MONGO_URI, {
        dbName: 'biblioteca-iud'
        })
        console.log('Successful Connection!')

   } catch (e) {
    console.warn('Connection Error!', e)
    throw new Error('Connection Error')
   }
}

module.exports = {mongoConnect}