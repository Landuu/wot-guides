import db from '../../database.js';
import { checkAndDrop } from '../base.js';


const connection = await db.getConnection();
const tableName = 'tanks';
const table = `
    CREATE TABLE ${tableName} (
        id INT(6) UNSIGNED PRIMARY KEY AUTO_INCREMENT,
        wot_tank_id MEDIUMINT UNSIGNED NOT NULL,
        name VARCHAR(255) NOT NULL,
        short_name VARCHAR(255) NOT NULL,
        tier TINYINT UNSIGNED NOT NULL
    );
`;

const allowToCreate = await checkAndDrop(connection, tableName);

if(allowToCreate) {
    await connection.execute(table);
    console.log('Migracja zakończona');
} else {
    console.log('Migracja zakończona niepowodzeniem');
}

connection.release();
db.end();