import pool from '../model/db.js';

import {
    insertLetterToDB, deleteLetterToDB
} from '../model/letterDAO.js';

//받아쓰기 문장 목록
export const getLetterList = async (req, res) => {
    //페이지네이션, 없을 시 기본값 1
    const page = parseInt(req.params.page) || 1;
    const limit = 3; //5개씩
    const offset = (page-1) * limit;

    //데이터 갯수 가져옴 (as: total)
    const [[{total}]] = await pool.query(`select count(*) as total from letter`);
    
    const sql = `select idx, nalang, kor from letter order by idx desc limit ? offset ?`;

    const [rows] = await pool.query(sql, [limit, offset]);
    const totalPages = Math.ceil(total/limit);

    res.render("bada", {
        letters: rows,
        currentPage: page,
        totalPages: totalPages
    });
};

//받아쓰기 문장 추가
export const insertToLetter = async (req, res) => {
    const { nalang, kor } = req.body;
    await insertLetterToDB(nalang, kor);
    res.redirect('/bada');
};

//받아쓰기 문장 삭제
export const deleteToLetter = async (req, res) => {
    const idx = req.params.idx;
    await deleteLetterToDB(idx);
    res.redirect('/bada');
};