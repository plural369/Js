let ambiente = undefined;

switch(process.env.PUBLICAR){
    case "HML": ambiente = configurarHML(); break;
    case "PROD": ambiente = configurarPROD(); break;
}

function configurarHML(){
    return{
        dialect: process.env.HML_DIALECT,
        host: process.env.HML_HOST,
        port: process.env.HML_PORT,
        username: process.env.HML_USER_NAME,
        password: process.env.HML_PASSWORD,
        database: process.env.HML_DATABASE,
        define:{
            timestamps: true,
            underscored: true
        }
    }
}

function configurarPROD(){
    return{
        dialect: process.env.PROD_DIALECT,
        host: process.env.PROD_HOST,
        port: process.env.PROD_PORT,
        user: process.env.PROD_USER_NAME,
        pass: process.env.PROD_PASSWORD,
        database: process.env.PROD_DATABASE,
        define:{
            timestamps: true,
            underscored: true
        }
    }
}

module.exports = ambiente