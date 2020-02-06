
exports.up = function (knex, Promise) {
    return knex.schema.createTable('users', table => {
        table.increments('id').primary()
        table.string('name').notNull() //nome do usuario
        table.string('email').notNull().unique() //email
        table.string('password').notNull() //senha
        table.boolean('admin').notNull().defaultTo(false) //adm do sistema
        table.timestamp('deletedAt') //armazenar data de usuario deletado


    })
};

exports.down = function (knex, Promise) {
    return knex.schema.dropTable('users')
};