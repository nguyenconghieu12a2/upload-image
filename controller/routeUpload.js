const express = require("express");
const router = express.Router();
const cloudinary = require("../utils/coudinary");
const upload = require("../middleware/multer");

router.post("/image/upload", upload.single("file"), function (req, res) {
  const folder = req.body.folder;

  if (!folder) {
    return res.status(400).json({
      success: false,
      message: "Folder name is required",
    });
  }

  cloudinary.uploader.upload(
    req.file.path,
    {
      folder: folder,
    },
    function (err, result) {
      if (err) {
        console.log(err);
        return res.status(500).json({
          success: false,
          message: "Error during upload",
        });
      }

      res.status(200).json({
        success: true,
        message: "Uploaded!",
        data: result,
      });
    }
  );
});

module.exports = router;
