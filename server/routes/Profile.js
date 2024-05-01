const express = require("express")
const router = express.Router()
const { auth } = require("../middlewares/auth")
const {
  updateDisplayPicture,
  findProfilePic
} = require("../controllers/Profile")

// ********************************************************************************************************
//                                      Profile routes
// ********************************************************************************************************

router.get('/profile-pic',auth,findProfilePic);
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router