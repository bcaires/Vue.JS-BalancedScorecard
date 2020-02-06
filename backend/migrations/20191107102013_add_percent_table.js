
exports.up = function(knex, Promise) {
    return knex.schema.alterTable('objectives', table => {
        table.integer('percentage') 
    })
};

exports.down = function(knex, Promise) {
    return knex.schema.alterTable('objectives', table => {
        table.dropColumn('percentage')
    })
};
