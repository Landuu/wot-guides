import db from '../../database.js';
import { newMigration } from '../base.js';


const connection = await db.getConnection();
const tableName = 'tanks';
const tableSql = `
    CREATE TABLE ${tableName} (
        id INT(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        wot_tank_id MEDIUMINT UNSIGNED NOT NULL,
        name VARCHAR(255) NOT NULL,
        short_name VARCHAR(255) NOT NULL,
        tier TINYINT UNSIGNED NOT NULL
    );
`;

await newMigration(connection, tableName, tableSql);

connection.release();
db.end();