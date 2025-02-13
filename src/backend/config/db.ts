import pg from 'pg';

const con = new pg.Client({
  host: "localhost",
  user: "postgres",
  port: 5432,
  password: "314",
  database: "localstorage",
});

con.connect()
  .then(() => console.log("Connected to PostgreSQL"))
  .catch((err) => console.error("Connection error", err));

export default con;
