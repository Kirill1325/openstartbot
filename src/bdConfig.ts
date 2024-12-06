import pg from 'pg'

const { Pool } = pg

export const pool = new Pool({
  connectionString: process.env.DB_URL
})

pool.on("connect", () => {
  console.log("connected to the Database");
});

export const createTables = async () => {

  const usersTable = ` 
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255)
  );
  `

  await pool
    .query(usersTable)
    .then((res: any) => {
      console.log('res', res);
    })
    .catch((err: any) => {
      console.log('err', err);
    });

  const createUsers = ` 
  INSERT INTO users (username) VALUES ('Вася'), ('Женя'), ('Катя');
  `

  await pool
    .query(createUsers)
    .then((res: any) => {
      console.log('res', res);
    })
    .catch((err: any) => {
      console.log('err', err);
    });

}; 