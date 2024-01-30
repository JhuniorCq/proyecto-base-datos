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
        
        return result;
    } finally {
        if(conection) {
            try {
                if (conection._releaseCallback) {
                    await conection.release();
                }
            } catch(err) {
                console.error('Error when closing the connection to the database xD: ', err.message)
            }
        }
    }
    
}

module.exports = {
    open
}; // Si hubiera puesto module.exports = open -> Todo module.exports es IGUAL a open

//Dato: Si se exporta así -> module.exports.open = open -> Se estaría agregando la función 'open' como una PROPIEDAD de module.exports

//El "finally": Este bloque se ejecuta siempre, ya sea que se produzca una excepción o no. Es útil para realizar acciones de limpieza o liberación de recursos que deben ocurrir independientemente del flujo del programa.