import { 
    joinToDB, 
    loginToDB, 
    findAll, 
    findByUserId, 
    removeMember, 
    updateMember,
    updatePwd
} from '../model/memberDAO.js';

export const joinMember = async (req, res) => {
    const { userid, passwd, nickname, email } = req.body;
    await joinToDB(userid, passwd, nickname, email);
    res.redirect('/login');
};

export const getLoginMsg = (req, res) => {
    const msg = req.query.msg || null; 
    res.render('login', {msg});
};

export const loginProc = async (req, res) => {
    const { userid, passwd } = req.body;
    const row = await loginToDB(userid, passwd);
    const user = row;
    if(user) { //값이 있으면 true, 없으면 false | 로그인에 성공한다면
        req.session.user_type = user.user_type;
        req.session.userid = user.userid;
        req.session.nickname = user.nickname;
        if (req.session.user_type === 'admin') {
            res.redirect('/member_mgr');
        } else {
            res.redirect('/');
        }
    } else {
        res.redirect('/login?msg=fail');
    }
};

export const logout = (req,res) => {
    req.session.destroy(()=> {
        res.redirect('/login?msg=logout');
    });
};

export const list = async (req, res) => {
    // 세션이 빈값이 아니거나   일반사용자라면
    if(!req.session.userid || req.session.user_type !== 'admin') {
        res.redirect('/login?msg=authority');
    }
    const members = await findAll();
    res.render('member_mgr', { members });
};

export const main = async (req, res) => {
    if (!req.session.userid) { //세션이 없으면(비로그인상태라면)
        res.redirect('/login?msg=authority');
    }
    const member = await findByUserId(req.session.userid);
    res.render('/', { member: member, session: req.session });
};

export const update = async (req, res) => {
    const { userid, nickname } = req.body;
    await updateMember(userid, nickname);
    res.redirect('/member_mgr');
};

export const remove = async (req, res) => {
    const { userid } = req.body;
    await removeMember(userid);
    res.redirect('/member_mgr');
};

//아이디 중복검사
export const checkId = async (req, res) => {
    try {
        const { userid } = req.query;
        if(!userid || userid.trim() ==='') {
            return res.status(400).json({ error: '아이디가 제공되지 않았습니다.'});
        }

        const user = await findByUserId(userid);
        const exists = !!user; //user 객체가 존재하면 true

        res.json({ exists });
    } catch (err) {
        console.error('아이디 중복 검사 오류:', err);
        res.status(500).json({ error: '서버 오류 발생' });
    }
};

//마이페이지
export const editProfile = async (req, res) => {
    try {
        const { userid } = req.params;
        const msg = req.query.msg || null;
        const user = await findByUserId(userid);
        res.render('editProfile', { user, msg });
    } catch (err) {
        console.error('사용자 정보 조회 오류:', err);
        res.status(500).send('사용자 상세정보 조회 실패');
    }
};

//회원정보수정 (updateUser)
export const updateUser = async (req, res) => {
    const {nickname, email, userid} = req.body;
    await updateMember(userid, nickname, email);
    res.redirect(`/editProfile/${userid}?msg=updated`);
}

//비밀번호 변경
export const changePwd = async(req,res) =>{
    const{idforuser, passwd} = req.query;
    await updatePwd(idforuser,passwd);
    res.send('ok');
};

//회원탈퇴
export const deleteUser = async (req, res) => {
    const userid = req.query.userid;
    await removeMember(userid); // 이제 'abc123' 같은 문자열이 넘어감
    req.session.destroy(()=> {
        res.send("이용해주셔서 감사합니다.");
    });
};
