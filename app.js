const { host, porta } = require("./config/config");
const { rotas } = require("./routes");

const aplicacao = (express) => {
    const app = express();
    rotas(app);

    app.listen(port, () => console.log(`Servidor rodando na em http://${host}:${porta}`));
}


module.exports = { aplicacao }