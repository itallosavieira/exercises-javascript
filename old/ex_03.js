const database = {
    tables: {},
    createTable(statement) {
        const regexp = /create table (\w+) \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        const tableName = parsedStatement[1];
        this.tables[tableName] = {
            columns: {},
            data: []
        };
        let columns = parsedStatement[2];
        columns = columns.split(", ");
        for (let column of columns) {
            column = column.split(" ");
            let name = column[0];
            let type = column[1];
            this.tables[tableName].columns[name] = type;
        };
    },
    execute(statement) {
        if (statement.startsWith("create table")) {
            return this.createTable(statement);
        }
    }
};

database.execute("create table author (id number, name string, age number, city string, state string, country string)");
console.log(JSON.stringify(database));


