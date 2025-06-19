import pool from './db.js';

export const joinToDB = async (userid, passwd, nickname, email) => {
    return pool.execute("insert into member (userid, passwd, nickname, email, user_type, created_at) values (?,sha2(?,256),?,?,?,now())", [userid, passwd, nickname, email,'user']);
};

export const loginToDB = async (userid, passwd) => {
    const [rows] = await pool.execute("select * from member where userid=? and passwd=sha2(?,256)", [userid,passwd]);
    return rows[0];
};

export const findByUserId = async (userid) => {
    const [rows] = await pool.execute('select * from member where userid=?', [userid]);
    return rows[0];
};

export const findAll = async () => {
    const [rows] = await pool.execute('select * from member');
    return rows;
};

export const updateMember = async (userid, nickname, email) => {
    const sql = 'update member set nickname=?, email=? where userid=?';
    return pool.execute(sql, [nickname, email, userid]);
};

export const removeMember = async (userid) => {
    const sql = 'delete from member where userid=?';
    return pool.execute(sql, [userid]);
};

//비밀번호 변경
export const updatePwd = async (idforuser,pwd) => {
    const sql = "update member set passwd = SHA2(?,256) where userid = ?";
    pool.execute(sql, [pwd, idforuser]);
};
