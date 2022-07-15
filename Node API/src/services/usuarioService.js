const Usuario = require('../models/Usuario');
const { NaoAutorizadoErro } = require('../erros/typeErros');
const geradorToken = require('../utils/geradorToken');
const usuarioCache = require('../cache/usuarioCache')

async function autenticacao(email, senha){
    // Saber se o usuario está cadastrado
    email = email.toString().toLowerCase();
    let usuario = await Usuario.findOne({where: { email }});
    //gerar um hash da senha
    senha = geradorToken.gerarHashDaSenha(senha);
    //verificar se o usuario e a senha estão corretos
    if(!usuario || (usuario.senha != senha)){
        throw new NaoAutorizadoErro(401, "Usuário ou senha inválidos");
    }
    // Se já existe, saber se a senha esta correta
    let credencial = _criarCredencial(usuario);

    return credencial;
    
}

async function logout(token){
    usuarioCache.removerNoCache(token);
}

function _criarCredencial(usuario){

    let dataExpiracao = geradorToken.gerarDataExpiracao()

    let credencial = usuarioCache.obterCredencial(usuario);

    if(credencial){
        if(credencial.dataExpiracao < new Date()){
            usuarioCache.removerNoCache(credencial.token);
        }else{
            usuarioCache.atualizarDataExpiracao(credencial.token, dataExpiracao)
            return credencial
        }
    }

    let token = geradorToken.criarToken(usuario);
    usuario.senha = undefined;

    credencial = {token, usuario, dataExpiracao};
    usuarioCache.adicionarNoCache(credencial);
    return credencial;
}

module.exports = {
    autenticacao,
    logout
}