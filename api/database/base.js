import prompt from 'prompt';

export const hasTable = async (connection, tableName) => {
    const showSql = `SHOW TABLES LIKE '${tableName}';`;

    const [show] = await connection.execute(showSql);
    return show.length == 1;
}

export const hasAnyData = async (connection, tableName) => {
    const checkSql = `SELECT EXISTS (SELECT 1 FROM ${tableName}) AS 'has_data';`;

    const [check] = await connection.execute(checkSql);
    const hasData = check[0].has_data;
    if(!hasData) return 1;

    console.log('**********************************************************************************')
    console.log(`Tabela ${tableName} zawiera dane, czy na pewno chcesz użyć polecenia DROP TABLE? (1 - yes / 0 - no)`);
    console.log('**********************************************************************************')
    const { confirm } = await prompt.get(['confirm']);
    
    return confirm == 1;
}


export const checkAndDrop = async (connection, tableName) => {
    const dropSql = `DROP TABLE IF EXISTS ${tableName};`;
    const allowToQuery = await hasTable(connection, tableName);
    if(!allowToQuery) {
        console.log(`Nie znaleziono tabeli o nazwie: ${tableName}`);
        return 1;
    }

    const allowToDrop = await hasAnyData(connection, tableName);
    if(!allowToDrop) {
        console.log(`Operacja 'DROP TABLE ${tableName}' została zatrzymana`);
        db.end();
        return 0;
    }

    (await connection).execute(dropSql);
    console.log(`Polecenie DROP TABLE ${tableName} wykonano pomyślnie`);
    (await connection).release();
    return 1;
}

export default {hasTable, hasAnyData, checkAndDrop};