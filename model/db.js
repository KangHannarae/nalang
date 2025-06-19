import { createPool } from "mysql2/promise";

const pool = createPool({
    host: "switchyard.proxy.rlwy.net",
    user: "root",
    password: "tOxDfnxNEPMghrYtwJdjcUMuYXRPKqcw",
    port: 31760,
    database: "nalang",
});

export default pool;
