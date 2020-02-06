
exports.up = function(knex, Promise) {
    return knex.schema.createTable('perspectives', table => {
        table.increments('id').primary()
        table.string('name').notNull() //nome da perspectiva
        table.integer('parentId').references('id').inTable('perspectives') //autorelacionamento
    })
  };
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('perspectives')
  };
  