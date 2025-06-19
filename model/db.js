import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "localhost",
    user: "user",
    password: "1234",
    port: 3306,
    database: "nalang",
});

export default pool;