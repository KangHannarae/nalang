import pool from './db.js';

//모음 목록
export const selectmoeumToDB = async () => {
    const [moeums] = await pool.execute("select * from moeum");
    return moeums;
};
