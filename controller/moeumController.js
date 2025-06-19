import { selectmoeumToDB } from "../model/moeumDAO.js"

//모음 내역
export const getMoeumList = async (req, res) => {
    try {
        const moeums = await selectmoeumToDB(); 
        res.render('moeumLearn', { moeums }); 
    } catch (error) {
        console.error('페이지 오류:', error);
        res.status(500).send('서버 오류 발생');
    }
};
