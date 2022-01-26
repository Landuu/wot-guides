import mysql from 'mysql2';
import 'dotenv/config';
import ck from 'ckey';


const db = mysql.createPool({
    host: ck.DB_HOST,
    database: ck.DB_NAME,
    user: ck.DB_USER,
    password: ck.DB_PASSWORD
});

export default db.promise();