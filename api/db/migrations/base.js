import db from '../../database.js';
import prompt from 'prompt';

const hasTable = async tableName => {
    const showSql = `SHOW TABLES LIKE '${tableName}';`;

    const [show] = await db.execute(showSql);
    return show.length == 1;
}

const hasAnyData = async tableName => {
    const checkSql = `SELECT EXISTS (SELECT 1 FROM ${tableName}) AS 'has_data';`;

    const [check] = await db.execute(checkSql);
    const hasData = check[0].has_data;
    if(!hasData) return 1;

    console.log('**********************************************************************************')
    console.log(`Tabela ${tableName} zawiera dane, czy na pewno chcesz użyć polecenia DROP TABLE? (1 - yes / 0 - no)`);
    console.log('**********************************************************************************')
    const { confirm } = await prompt.get(['confirm']);
    
    return confirm == 1;
}


export const checkAndDrop = async tableName => {
    const dropSql = `DROP TABLE IF EXISTS ${tableName};`;

    const allowToQuery = await hasTable(tableName);
    if(!allowToQuery) {
        console.log(`Nie znaleziono tabeli o nazwie: ${tableName}`);
        return 1;
    }

    const allowToDrop = await hasAnyData(tableName);
    if(!allowToDrop) {
        console.log(`Operacja 'DROP TABLE ${tableName}' została zatrzymana`);
        db.end();
        return 0;
    }

    const res = await db.execute(dropSql);
    console.log(`Polecenie DROP TABLE ${tableName} wykonano pomyślnie`);
    return 1;
}

export default {checkAndDrop};