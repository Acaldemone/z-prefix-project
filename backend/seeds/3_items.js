/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('items').del()
  await knex('items').insert([
    {id: 1, user_id: 1, item_name: 'apple', description: 'Crisp Apples', quantity: 10},
    {id: 2, user_id: 1, item_name: 'orange', description: 'Juicy oranges', quantity: 8},
    {id: 3, user_id: 1, item_name: 'bannana', description: 'Ripe Bananas', quantity: 2},
    {id: 4, user_id: 1, item_name: 'carrot', description: 'Hearty carrots', quantity: 15},
    {id: 5, user_id: 1, item_name: 'tomato', description: 'Fresh tomatoes', quantity: 7}
  ]);
};
