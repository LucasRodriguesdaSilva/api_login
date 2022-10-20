let fs = require('fs');
const { raiz_projeto } = require('../config/config');

var argumentos = process.argv;

const gerar_diretorio_e_arquivos = (texto) => {

    let tamanho_texto = texto.length;

    if(tamanho_texto === 3){
        gerar_todos_arq_dir(texto);
    }
    else if(tamanho_texto > 3) {
        gerar_arq_dir(texto, tamanho_texto);
    }
}

const gerar_arq_dir = (texto, tamanho_texto) => {

    const nome_arquivo = texto[2];
    const texto_controller_procurado = texto.find(elemento => procurar_em_string(elemento, 'controller'));
    const texto_model_procurado = texto.find(elemento => procurar_em_string(elemento, 'model'));
    
    const conteudo_arquivo = criar_conteudo_arquivo(nome_arquivo);

    try {
        if(texto_controller_procurado !== undefined){
            const {dir_controller} = criar_caminho_diretorio(nome_arquivo);
            const {arquivo_controller}   = criar_caminho_arquivo(dir_controller, '', nome_arquivo);

            verifica_se_existe_diretorio_controller(dir_controller);
            criar_diretorio_controller(dir_controller);
            criar_arquivo_controller(arquivo_controller, conteudo_arquivo);
        }
    
        if(texto_model_procurado !== undefined){
            const {dir_model} = criar_caminho_diretorio(nome_arquivo);
            const {arquivo_model}   = criar_caminho_arquivo('', dir_model, nome_arquivo);

            verifica_se_existe_diretorio_model(dir_model);
            criar_diretorio_model(dir_model);
            criar_arquivo_model(arquivo_model, conteudo_arquivo);
        }
    
        return console.log('Arquivo Criado com Sucesso!');
        
    } catch (error) {
        console.error(error);        
    }

    

    // console.log(texto, '\n',texto_controller_procurado, ' --- ', texto_model_procurado);

}
/*
const retirar_caracteres_especiais = string => {
    return string.normalize('NFD').replace(/[\[\].!'@,><|:\\;&*()_+=]|([^0-9a-zA-Z])/g, ''); 
}
*/
const procurar_em_string = (string, texto_a_ser_procurado) => {
    return string.search(texto_a_ser_procurado) !== -1 ? true : false;
}


const gerar_todos_arq_dir = texto => {

    const nome_arquivo = texto[2];
    const {dir_controller, dir_model}           = criar_caminho_diretorio(nome_arquivo);
    const {arquivo_controller, arquivo_model}   = criar_caminho_arquivo(dir_controller, dir_model, nome_arquivo);
    const conteudo_arquivo = criar_conteudo_arquivo(nome_arquivo);

    try {

        verifica_se_existe_diretorio_controller(dir_controller);
        verifica_se_existe_diretorio_model(dir_model);

        criar_diretorio_controller(dir_controller);
        criar_diretorio_model(dir_model);

        criar_arquivo_controller(arquivo_controller, conteudo_arquivo);
        criar_arquivo_model(arquivo_model, conteudo_arquivo);

        return console.log('Arquivos Criados com Sucesso!');
        
    } catch (error) {
        console.error(error);
    } 

}

const criar_arquivo_controller = (arquivo_controller, conteudo_arquivo) => {

    fs.writeFile(arquivo_controller, conteudo_arquivo ,(err) => {
        if(err) throw 'Erro ao criar arquivo: ' + err;
    });

    return;
}

const criar_arquivo_model = (arquivo_model, conteudo_arquivo) => {
    fs.writeFile(arquivo_model, conteudo_arquivo,(err) => {
        if(err) throw 'Erro ao criar arquivo: ' + err;
    });

    return;
}

const criar_conteudo_arquivo = (nome_arquivo) => {
    return 'const ' + `${nome_arquivo}` + ' = () => { }\n\n' + 'module.exports = { ' + `${nome_arquivo}` + ' }';
}

const criar_caminho_diretorio = nome_arquivo => {
    return {
        dir_controller:     raiz_projeto + '\\api' + '\\controllers'    + '\\' + `${nome_arquivo}`,
        dir_model:          raiz_projeto + '\\api' + '\\models'         + '\\' + `${nome_arquivo}`        
    }
}

const criar_caminho_arquivo = (dir_controller, dir_model, nome_arquivo) => {
    return {
        arquivo_controller: dir_controller  + '\\' + `${nome_arquivo}.js`,
        arquivo_model:      dir_model       + '\\' + `${nome_arquivo}.js`,        
    }
}

const verifica_se_existe_diretorio_controller = dir_controller => {
    if(fs.existsSync(dir_controller)) throw 'O nome do diretório já existe!';

    return;
}

const verifica_se_existe_diretorio_model = dir_model => {
    if(fs.existsSync(dir_model)) throw 'O nome do diretório já existe!';

    return;
}

const criar_diretorio_controller = dir_controller => {
    fs.mkdir(dir_controller, (err) => {
        if(err) throw 'Erro ao Criar diretorio: ' + err;
    });

    return;
}

const criar_diretorio_model = dir_model => {
    fs.mkdir(dir_model, (err) => {
        if(err) throw 'Erro ao Criar diretorio: ' + err;
    });

    return;
}



gerar_diretorio_e_arquivos(argumentos);