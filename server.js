var express = require("express");
var app = express();
var multer = require("multer");
var upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 20971520
    }
});

function endJSON(json, res) {
    res.writeHead(200, {"Content-Type": "application/json"});
    res.end(JSON.stringify(json));
}

app.post("/get_file_size", upload.single("file"),
    function(req, res, next) {
        if (req.file) {
            endJSON({
                size: req.file.size
            }, res);
        
            req.file.buffer = null;
        } else {
            endJSON({
                error: "No file submitted"
            }, res);
        }
    });

app.use("/", express.static("public"));

app.use(
    function(err, req, res, next) {
        console.error(err);
            
        endJSON({
            error: err.message
        }, res);
    });

var port = process.env.PORT || 8080;
app.listen(port,
    function() {
        console.log("Node.js listening on port " + port + "...");
    });