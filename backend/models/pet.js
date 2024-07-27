import pool from '../config/db.js'

async function getPets() {
  const [rows] = await pool.query("SELECT * FROM pets");
  return rows;
}

async function getPet(id) {
  const [rows] = await pool.query(
    `
      SELECT * 
      FROM pets
      WHERE pet_id = ?
      `,
    [id]
  );
  return rows[0];
}

async function createPet(name) {
  const [result] = await pool.query(
    `INSERT INTO pets (name)
    VALUES (?)
    `,
    [name]
  );
  const id = result.insertId;
  return getPet(id);
}

async function updatePet(id, newPet) {
  const result = await pool.query(
    `UPDATE pets
      SET name = ?
      WHERE pet_id = ?
      `,
    [newPet.name, id]
  );
  const pet = await getPet(id);
  return pet;
}

async function deletePet(id) {
  const pet = getPet(id);
  await pool.query(
    `DELETE FROM pets
      WHERE pet_id = ?
      `,
    [id]
  );
  return pet;
}

export default {
  getPets,
  getPet,
  createPet,
  updatePet,
  deletePet,
};
