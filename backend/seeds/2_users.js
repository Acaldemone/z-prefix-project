/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('users').del()
  await knex('users').insert([
    {id: 1, first_name: 'Anthony', last_name: 'Caldemone', username: 'acaldemone', password: '123456789', role_id: 1},
    {id: 2, first_name: 'Ella', last_name: 'Nguyen', username: 'enguyen', password: '987654321', role_id: 2}
  ]) 
};
