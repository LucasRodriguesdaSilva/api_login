
const path = require('path');


const configuracoes = {
    host: '127.0.0.1',
    porta: 3000,
    raiz_projeto: path.dirname(__dirname),
}

const {host, porta, raiz_projeto} = configuracoes;


module.exports = { host, porta, raiz_projeto };