
exports.up = function(knex, Promise) {
    return knex.schema.createTable('map', table => {
        table.increments('id').primary()
        table.string('name').notNull() //nome do componente
        table.integer('parentId').references('id').inTable('map') //autorelacionamento
        table.integer('perspectiveId').references('id').inTable('perspectives').notNull() //perspectiva relacionada
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('map')
  };
