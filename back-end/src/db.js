const oracledb = require('oracledb');

db = {
    user: 'user_jhunior',
    password: '123456',
    connectString: 'localhost:1521'
}

const open = async (sql, binds, autoCommit) => {
    let conection;

    try {
        conection = await oracledb.getConnection(db);
        let result = await conection.execute(sql, binds, {autoCommit});
        conection.release();
        return result;
    } finally {
        if(conection) {
            try {
                await conection.close();
            } catch(err) {
                console.error('Error when closing the connection to the database: ', err.message)
            }
        }
    }
    
}

module.exports = open; // Todo module.exports es IGUAL a open

//Dato: Si se exporta así -> module.exports.open = open -> Se estaría agregando la función 'open' como una PROPIEDAD de module.exports

//El "finally": Este bloque se ejecuta siempre, ya sea que se produzca una excepción o no. Es útil para realizar acciones de limpieza o liberación de recursos que deben ocurrir independientemente del flujo del programa.