import pool from './db.js';

//자음 목록
export const selectJaeumToDB = async () => {
    const [jaeums] = await pool.execute("select * from jaeum");
    return jaeums;
};

//자음 등록 (관리자 전용)
// export const insertComToDB = async (userid, com_name, time_pay, tax_rate, include_week_allowance) => {
//     return pool.execute("insert into workplace (userid, com_name, time_pay, tax_rate, include_week_allowance, created_at) values (?, ?, ?, ?, ?, now())", [userid, com_name, time_pay, tax_rate, include_week_allowance]);
// };

// //자음 설명보기
// export const detailComToDB = async (workplace_id) => {
//     const [result] = await pool.query(`
//     select workplace_id, com_name, time_pay, tax_rate, include_week_allowance from workplace where workplace_id=?`, [workplace_id]);
//   return result[0];
// };

//자음 수정(관리자 전용)
// export const updateComToDB = async (workplace_id, userid, com_name, time_pay, tax_rate, include_week_allowance) => {
//     const sql = 'update workplace set userid=?, com_name=?, time_pay=?, tax_rate=?, include_week_allowance=? where workplace_id=?';
//     return pool.execute(sql, [userid, com_name, time_pay, tax_rate, include_week_allowance, workplace_id]);
// };

//자음 삭제(관리자 전용)
// export const deleteComToDB = async (workplace_id) => {
//     const sql = 'delete from workplace where workplace_id=?';
//     return pool.execute(sql, [workplace_id]);
// };