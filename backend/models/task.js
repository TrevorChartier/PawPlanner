import pool from '../config/db.js';

async function createTask(newTask) {
  const [result] = await pool.query(
    `
        INSERT INTO 
            tasks (title, due_date, pet_id)
        VALUES 
            (?,?,?)
    `,
    [newTask.title, newTask.due_date, newTask.pet_id],
  );
  const id = result.insertId;
  return getTask(id);
}

async function getTasks() {
  const [rows] = await pool.query(
    `
        SELECT 
            * 
        FROM 
            tasks
    `,
  );
  return rows;
}

async function getTask(id) {
  const [rows] = await pool.query(
    `
        SELECT 
            *
        FROM 
            tasks
        WHERE 
            task_id = ?
    `,
    [id],
  );
  return rows[0];
}

async function getTasksByPet(petID) {
  const [rows] = await pool.query(
    `
        SELECT 
            *
        FROM 
            tasks
        WHERE 
            pet_id = ?
    `,
    [petID],
  );
  return rows;
}

async function updateTask(id, newTask) {
  const result = await pool.query(
    `
        UPDATE 
            tasks
        SET 
            title = ?,
            due_date = ?,
            pet_id = ?
        WHERE 
            task_id = ?
    `,
    [newTask.title, newTask.due_date, newTask.pet_id, id],
  );
  const task = await getTask(id);
  return task;
}

async function deleteTask(id) {
  const task = await getTask(id);
  await pool.query(
    `
        DELETE FROM
            tasks
        WHERE 
            task_id = ?
    `,
    [id],
  );
  return task;
}

export default {
  createTask,
  getTasks,
  getTask,
  getTasksByPet,
  updateTask,
  deleteTask,
};
