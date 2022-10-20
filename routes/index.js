const { pagina_inicial, cadastro } = require("../api/controllers");

const rotas = (app) => {

    app.get('/',(req, res) => pagina_inicial(req, res));
    app.get('/cadastrar',(req, res) => res.send('cadastro'));
    
}


module.exports = { rotas }