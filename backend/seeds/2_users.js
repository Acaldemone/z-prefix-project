
const bcrypt = require('bcrypt');
/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'Anthony', last_name: 'Caldemone', username: 'acaldemone', password: bcrypt.hashSync('123456789', 10), role_id: 1},
    {id: 2, first_name: 'Ella', last_name: 'Nguyen', username: 'enguyen', password: bcrypt.hashSync('987654321',10), role_id: 2}
  ]) 
};
