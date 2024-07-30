import pool from '../config/db.js';

async function createPet(newPet) {
  const [result] = await pool.query(
    `
      INSERT INTO 
        pets (name)
      VALUES 
        (?)
    `,
    [newPet.name],
  );
  const id = result.insertId;
  return getPet(id);
}

async function getPets() {
  const [rows] = await pool.query('SELECT * FROM pets');
  return rows;
}

async function getPet(id) {
  const [rows] = await pool.query(
    `
      SELECT * 
      FROM pets
      WHERE pet_id = ?
      `,
    [id],
  );
  return rows[0];
}

async function updatePet(id, newPet) {
  const result = await pool.query(
    `UPDATE pets
      SET name = ?
      WHERE pet_id = ?
      `,
    [newPet.name, id],
  );
  const pet = await getPet(id);
  return pet;
}

async function deletePet(id) {
  const pet = await getPet(id);
  await pool.query(
    `DELETE FROM pets
      WHERE pet_id = ?
      `,
    [id],
  );
  return pet;
}

export default {
  createPet,
  getPets,
  getPet,
  updatePet,
  deletePet,
};
