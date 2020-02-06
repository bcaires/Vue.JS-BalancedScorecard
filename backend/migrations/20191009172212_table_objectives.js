
exports.up = function(knex, Promise) {
    return knex.schema.createTable('objectives', table => {
        table.increments('id').primary()
        table.string('name').notNull() //nome do obj
        table.string('indicators').notNull() //descricao
        table.binary('content').notNull() //conteudo do obj
        table.boolean('priority').notNull().defaultTo(false) //prioridade
        table.timestamp('expiration') //prazo
        table.integer('userId').references('id').inTable('users').notNull()
        table.integer('perspectiveId').references('id').inTable('perspectives').notNull()
  
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('objectives')
  };
