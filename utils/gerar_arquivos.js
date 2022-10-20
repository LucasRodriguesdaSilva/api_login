let fs = require('fs');
const { configuracoes } = require('../config/config');



var argumentos = process.argv;


const gerar_arquivo = (texto) => {

    let tamanho = texto.length;

    const { raiz_projeto } = configuracoes;

    if(tamanho === 3){
        const nome_arquivo = texto[2];
        const dir_controller = raiz_projeto + '\\api' + '\\controllers' + '\\' + `${nome_arquivo}`;
        const dir_model = raiz_projeto + '\\api' + '\\models' + '\\' + `${nome_arquivo}`;
        
       if(fs.existsSync(dir_controller)) return console.error('Arquivo Existente!');
        
        fs.mkdir(dir_controller, (err) => {
            if(err) return console.error(err);
        });

        fs.mkdir(dir_model, (err) => {
            if(err) return console.error(err);
        });
        
        const arquivo_controller = dir_controller + '\\' + `${nome_arquivo}.js`;
        const arquivo_model = dir_model + '\\' + `${nome_arquivo}.js`;

        const funcao = 'const ' + `${nome_arquivo}` + '= () => { }\n\n' + 'module.exports = { ' +  `${nome_arquivo}` + ' }';

       fs.writeFile(arquivo_controller, funcao ,(err) => {
        if(err) return console.error(err);
         });
       fs.writeFile(arquivo_model, funcao,(err) => {
        if(err) return console.error(err);
         });

       console.log(arquivo_controller);
       console.log(dir_controller);
    }
    else if(tamanho > 3) {
        
    }

   /* let tamanho = tipo.length;
    if(tamanho >= 3){
        for (let index = 3; index <= tamanho; index++) {
            //const element = array[index];
            
        }
    }*/

}




gerar_arquivo(argumentos);