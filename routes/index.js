var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});
router.post('/login/loginCheck',function (req,res,next) {
    let reqData = req.body;
    var returnData = [];
    let file = path.join(__dirname, 'usersLogin.json');
    let jsonData = JSON.parse(fs.readFileSync(file));
    let {userToken: token} = jsonData;
    for (var value of token) {
        if (value.userEamil === reqData.user) {
            returnData = value;
            break;
        }
    }
    res.send(returnData);
});

router.get('/user/info',function (req,res,next) {
    let reqData = req.query;
    let returnData;
    let file = path.join(__dirname, 'usersLogin.json');
    let jsonData = JSON.parse(fs.readFileSync(file));
    let {userInfo: userinfo} = jsonData;
    for (var value of userinfo) {
        if (value.token === reqData.token) {
            returnData = value;
            break;
        }
    }
    res.send(returnData);
});
router.get('/user/getMusic',function (req,res,next) {
    var media = path.join(__dirname,'../public/media');
    fs.readdir(media,(err,names) => {
        if (err) {
            console.log(err);
        } else {
            res.send({'musics': names});
        }
    });
});
module.exports = router;
