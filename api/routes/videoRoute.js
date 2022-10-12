import express from "express";
import {
  addVideo,
  getallVideo,
  getVideo,
  like,
  myVideos,
  trending,
  updateVideo,
  view,
} from "../controllers/videoController.js";
import { verifyToken } from "../utils/verifyToken.js";
const router = express.Router();
// //add video
router.post("/addVideo", verifyToken, addVideo);
// //edit
router.put("/:id", verifyToken, updateVideo);

// //to get one video
router.get("/get/:id", getVideo);

// //to get all video
router.get("/getall", getallVideo);

// //to update views
router.put("/view/:id", view);

// //to get trending items
router.get('/trend',trending)
//to update likes
router.put('/like/:id',verifyToken,like)
router.get('/myVideos/:id',myVideos)

export default router;
