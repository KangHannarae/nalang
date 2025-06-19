import pool from './db.js';

//받아쓰기 문장 등록 (관리자 전용)
export const insertLetterToDB = async (nalang, kor) => {
    return pool.execute('insert into letter (nalang, kor) values (?, ?)', [nalang, kor]);
};

// //받아쓰기 문장 수정(관리자 전용)
// export const updateLetterToDB = async (idx, nalang, kor) => {
//     const sql = 'update letter set nalang=?, kor=? where idx=?';
//     return pool.execute(sql, [nalang, kor, idx]);
// };

//받아쓰기 문장 삭제(관리자 전용)
export const deleteLetterToDB = async (idx) => {
    const sql = 'delete from letter where idx=?';
    return pool.execute(sql, [idx]);
};

