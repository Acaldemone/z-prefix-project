/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('users', table => {
        table.increments('id');
        table.string('first_name');
        table.string('last_name');
        table.string('username');
        table.string('password');
        table.integer('role_id');
        table.foreign('role_id').references('roles.id');
      })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('users', table => {
        table.dropForeign('role_id');
    })
    .then(function() {
        return knex.schema.dropTableIfExists('users');
    })
};
