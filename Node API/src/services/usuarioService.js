const Usuario = require('../models/usuario');
const {} = require('../erros/typeErros');
const geradorToken = require('../utils/geradorToken');

async function autenticacao(email, senha){
    // Saber se o usuario está cadastrado
    email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({where:{email}});
    //gerar um hash da senha
    senha = geradorToken.gerarHashDaSenha(senha);
    //verificar se o usuario e a senha estão corretos
    if(!usuario || (usuario.senha != senha)){
        throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
    }
    // Se já existe, saber se a senha esta correta
    

}

module.exports = autenticacao