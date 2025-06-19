import { Router } from "express";
import {  //페이지 이동
  index, getJoinPage, getMyPage, getMunbubPage, getInsertLetterPage,
  getTransPage
 } from "../controller/moveController.js";

import { getJaeumList } from "../controller/jaeumController.js";
 
import { getMoeumList } from "../controller/moeumController.js";

import {
    joinMember, loginProc, logout, 
    getLoginMsg, list, update, remove, checkId,
    editProfile, updateUser, changePwd, deleteUser
} from "../controller/memberController.js";

import {
  getLetterList, insertToLetter, deleteToLetter,
} from "../controller/letterController.js"


const router = Router();

//기본 페이지 이동
router.get("/", index);
router.get("/jaeumLearn", getJaeumList);
router.get("/moeumLearn", getMoeumList);
router.get('/login', getLoginMsg); 
router.get('/join', getJoinPage);
router.get('/member_mgr', list); 
router.get('/myPage', getMyPage);
router.get('/editProfile/:userid', editProfile); //마이페이지
router.get('/munbub', getMunbubPage);
router.get('/insertLetter', getInsertLetterPage);
router.get('/trans', getTransPage);

//멤버 처리
router.post('/joinMember', joinMember);
router.post('/loginProc', loginProc);
router.get('/logout', logout);
router.post('/update', update);
router.post('/remove', remove);
router.get('/checkid', checkId);  
router.post('/userUpdate/:userid', updateUser); //회원정보수정
router.post("/changePwd",changePwd);
router.get("/changePwd",changePwd);
router.get("/deleteUser", deleteUser);

//받아쓰기 페이지
router.get('/bada', getLetterList);
router.get('/bada/page/:page', getLetterList);
router.post('/insertToLetter', insertToLetter);
router.get('/deleteLetter/:idx', deleteToLetter);
export default router;
