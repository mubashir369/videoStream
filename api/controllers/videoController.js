import Video from "../models/VideoModel.js";


export const addVideo = async (req, res) => {

  try {
    console.log(res.user);
    const video = await Video.create(req.body);
    if (video) {
      res.status(200).json({ success: true, video });
    } else {
      res.status(400).json({ message: "Invalid  data" });
    }
  } catch (error) {
    console.log(error);
    console.log(req.body);
    res.status(400).json({ message: "Something Wrong" });
  }
};
export const getVideo = async (req, res) => {
  console.log("dd");
  console.log(req.params);
  try {
    const video = await Video.findById(req.params.id);
    res.status(200).json({ video });
  } catch (error) {
    res.status(400).json({ message: "Something Wrong" });
  }
};
export const getallVideo = async (req, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json({ videos });
  } catch (error) {
    res.status(400).json({ message: "Something Wrong" });
  }
};
export const updateVideo = async (req, res) => {
  try {
    const video = await Video.findById(req.params.id);
    if (res.user._id == video.userId) {
      const updateVideo = await Video.findByIdAndUpdate(
        req.params.id,
        { $set: req.body },
        { new: true }
      );
      res.status(200).json({ success: true, updateVideo });
    } else {
      res.status(403).json({
        success: false,
        message: "you are  not allowed to update this video",
      });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: "Something Wrong" });
  }
};
export const view = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(req.params.id, {
      $inc: { views: 1 },
    });
    if (!video) {
      res.status(401).json({ message: "unable to like" });
    }
    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    res.status(404).json({ success: false, message: "Something Wrong" });
  }
};
export const trending = async (req, res) => {
  try {
    const video = await Video.find().sort({ views: -1 });
    if (video) {
      res.status(200).json(video);
    } else {
      res.status(401).json({ message: "unable to find" });
    }
  } catch (error) {
    res.status(404).json({ success: false, message: "Something Wrong" });
  }
};
export const like=async(req,res)=>{
    try {

        const video= await Video.findByIdAndUpdate(req.params.id,{
            $push: { like:res.user._id },
        })
        res.status(200).json({success:true,video})
    } catch (error) {
        console.log(error);
        res.status(404).json({ success: false, message: "Something Wrong" });
    }
}
export const myVideos=async(req,res)=>{

}