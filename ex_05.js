const DatabaseError = function(statement, message) {
    this.statement = statement;
    this.message = message;
};

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
        for (column of columns) {
            column = column.split(" ");
            let name = column[0];
            let type = column[1];
            this.tables[tableName].columns[name] = type;
        }
    },
    insert(statement) {
        const regexp = /insert into (\w+) \((.+)\) values \((.+)\)/;
        const parsedStatement = statement.match(regexp);
        const tableName = parsedStatement[1];
        this.tables[tableName] = {
            columns: {},
            data: []
        };
        let columns = parsedStatement[2];
        columns = columns.split(", ");
        let values = parsedStatement[3];
        values = values.split(", ");
        for (let i = 0; i < columns.length; i++) {
            
        }
    },
    execute(statement) {
        if (statement.startsWith("create table")) {
            return this.createTable(statement);
        }
        if (statement.startsWith("insert into")) {
            return this.insert(statement);
        }
        const message = `Syntax error: "${statement}"`;
        throw new DatabaseError(statement, message);
    }
};

try {
    database.execute("create table author (id number, name string, age number, city string, state string, country string)");
    database.execute("insert into author (id, name, age) values (1, Douglas Crockford, 62)");
    database.execute("insert into author (id, name, age) values (2, Linus Torvalds, 47)");
    database.execute("insert into author (id, name, age) values (3, Martin Fowler, 54)");            
    //console.log(JSON.stringify(database));
} catch(e) {
    console.log(e.message);
};


