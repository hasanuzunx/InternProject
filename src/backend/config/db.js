import pkg from "pg";
const { Client } = pkg;
const con = new Client({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:"314",
    database:"localstorage"
})

con.connect().then(() =>console.log("connected"))

export default con;