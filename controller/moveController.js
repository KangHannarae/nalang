export const index = async (req, res) => {
    res.render("index");
};

export const getLoginPage  = async (req, res) => {
    res.render('login');
};

export const getJoinPage  = async (req, res) => {
    res.render('join');
};

export const getMyPage  = async (req, res) => {
    res.render('mypage');
};

// export const getBadaPage = async (req, res) => {
//     res.render('bada');
// };

export const getMunbubPage = async (req, res) => {
    res.render('munbub');
};

export const getInsertLetterPage = async (req, res) => {
    res.render('insertLetter');
};

export const getTransPage = async (req, res) => {
    res.render('trans');
};


