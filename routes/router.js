const express = require('express');

const indexCtrl = require('../controllers/index');
//const topicCtrl = require('../controllers/topic');
//const categoryCtrl = require('../controllers/category');
const userCtrl = require('../controllers/user');

// 创建路由对象

const router = express.Router();
// 导出模块
module.exports = router;

// 设置路由规则
// 1. 首页
router.get('/', indexCtrl.showIndex);
// 2. 用户页面
router
    .get('/signin', userCtrl.showSignin)
    .post('/signin', userCtrl.handleSignin)
    .get('/signup', userCtrl.showSigup)
    .post('/signup', userCtrl.handleSigup)
    .get('/signout', userCtrl.handleSigout);

