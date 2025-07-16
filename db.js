var db = require('knex')({
        client: 'sqlite3',
        connection: {
            filename: 'recetas.sqlite'
        }
    }
)

module.exports = db