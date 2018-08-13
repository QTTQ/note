  return mysql.createPool({
    host: "localhost",
    user: mysqlConfig.user,
    password: mysqlConfig.password,
    database: mysqlConfig.database,
    port: 3306,
  });