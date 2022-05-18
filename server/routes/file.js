const express = require("express");
const router = express.Router();

const multer = require("multer");
const upload = multer({ dest: "./public/img" });

router.post("/image", upload.single("file"), (req, res, next) => {
    //记录文件相对路径
    let fileObj = req.file;
    //调用fs模块，为当前文件进行重命名
    const fs = require("fs");
    const path = "public/img";
    const baseUrl = "http://localhost:3003/";
    fs.readdir(path, function (err, files) {
        var oldPath = path + "/" + fileObj.filename;
        var newPath = oldPath + ".png";
        fs.rename(oldPath, newPath, function (err) {
            if (!err) {
                res.json({
                    result: 0,
                    data: {
                        url: baseUrl + newPath
                    }
                })
            }
        });
    });
   
});

module.exports = router;
