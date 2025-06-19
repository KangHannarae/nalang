import { selectJaeumToDB } from "../model/jaeumDAO.js"

//자음 내역
export const getJaeumList = async (req, res) => {
    try {
        const jaeums = await selectJaeumToDB(); 
        res.render('jaeumLearn', { jaeums }); 
    } catch (error) {
        console.error('페이지 오류:', error);
        res.status(500).send('서버 오류 발생');
    }
};
