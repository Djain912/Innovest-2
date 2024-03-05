import express from "express";
import User from "../models/usermodel.js";
const router = express.Router();
import {home,signup,login,contact,news,user,profile,delpimg,pdf,delpdf} from "../controllers/auth-contoll.js";
import signupSchema, { contactSchema } from "../validators/validator.js";
import {validate} from "../validators/validator.js";
import {loginErrorSchem} from "../validators/validator.js";
import authUserTokenMid from "../middleware/authUserTokenMid.js";
import {createpost,getpost,likepost,unlikepost,comments,myposts, delpost} from "../controllers/post-controll.js";
import showprofile from "../controllers/show-profile.js";
import allUsers from "../controllers/allUsers.js";
import {accessChat,fetchChats,crtGrpChat,rnmgrp,addtogrp,rmfromgrp} from "../controllers/chatControll.js";
import {getRound,addRound,profilegetround} from "../controllers/round-controll.js";
import {LiveFunc,LiveList,RoomFunc} from "../controllers/livecontroller.js"
import { addproduct,getproduct,prdetail,myproduct,delproduct } from "../controllers/product-controll.js";
import {sendMail,cmail} from "../controllers/mailcontroll.js"
import {sendmsg,allmsg} from "../controllers/message.js"



router.route("/").get(home);
router.route("/signup").post(validate(signupSchema),signup);
router.route("/login").post(validate(loginErrorSchem),login);
router.route("/contact").post(validate(contactSchema),contact);
router.route("/news").get(news)
router.route("/user").get(authUserTokenMid,user);
router.route("/profile").put(profile);

router.route("/delpimg").put(delpimg);
router.route("/pdf").put(pdf);

// post routers
router.route("/createpost").post(authUserTokenMid,createpost);
router.route("/getpost").get(getpost);
router.route("/likepost").put(authUserTokenMid,likepost);
router.route("/unlikepost").put(authUserTokenMid,unlikepost);
router.route("/comments").put(authUserTokenMid,comments);
router.route("/myposts").post(myposts);
router.route("/delpost").put(delpost);
router.route("/delpdf").put(delpdf);


///
router.route("/showprofile/:id").get(showprofile);
///chat endpoints
router.route("/allUsers").get(authUserTokenMid,allUsers);
router.route("/accessChat").post(authUserTokenMid,accessChat);
router.route("/fetchChats").get(authUserTokenMid,fetchChats);
router.route("/group").post(authUserTokenMid,crtGrpChat);
router.route("/renamegrp").put(authUserTokenMid,rnmgrp);
router.route("/addToGrp").put(authUserTokenMid,addtogrp);
router.route("/rmFromGrp").put(authUserTokenMid,rmfromgrp);

// router.route("/verify/:verificationToken").get(verifyuser); 

router.route("/addRound").post(authUserTokenMid,addRound);
router.route("/getRound").get(authUserTokenMid,getRound);
router.route("/getprofileRound/:userId").get(profilegetround);

router.route("/live").post(LiveFunc);
router.route("/room").put(RoomFunc);
router.route("/liveget").get(LiveList);


//products
router.route("/addproduct").post(authUserTokenMid,addproduct);
router.route("/getproduct").get(getproduct);
router.route("/prdetail/:id").get(prdetail);
router.route("/myproduct/:id").get(myproduct);
router.route("/delproduct").put(delproduct);

//mail
router.route("/mail").post(sendMail);
router.route("/cmail").post(cmail);


/// messages 

router.route("/sendmsg").post(authUserTokenMid,sendmsg);
router.route("/:chatId").get(authUserTokenMid,allmsg);






//exporting 
export  default router;