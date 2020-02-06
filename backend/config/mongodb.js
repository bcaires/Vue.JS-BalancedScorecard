const mongoose = require('mongoose')
/* Nome do banco balanced_stats, aqui ele cria automaticamente no mongo */
mongoose.connect('mongodb://localhost/balanced_stats', { useNewUrlParser: true }) //padrao para conectar
    .catch(e => {
        const msg = 'ERROR! NÃO FOI POSSÍVEL CONECTAR AO MONGO DB'
        console.log('\x1b[41m%s\x1b[37m', msg , '\x1b[0m')
    })