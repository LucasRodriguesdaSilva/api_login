const { configuracoes } = require("./config/config");
const { rotas } = require("./routes");

const aplicacao = (express) => {
    const app = express();

    hostname = configuracoes.host;
    port = configuracoes.porta;

    rotas(app);

    app.listen(port, () => console.log(`Servidor rodando na em http://${hostname}:${port}`));
}


module.exports = { aplicacao }