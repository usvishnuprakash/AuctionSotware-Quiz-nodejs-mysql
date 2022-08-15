const mysql = require("mysql");
const util = require("util");
const dbConfig = require("../config/db.config");

// module.exports = mysql.createPool({
//   host: dbConfig.HOST,
//   user: dbConfig.USER,
//   password: dbConfig.PASSWORD,
//   database: dbConfig.DB,
// });
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});
module.exports = {
  query(sql, args) {
    return util.promisify(connection.query).call(connection, sql, args);
  },
  close() {
    return util.promisify(connection.end).call(connection);
  },
};
