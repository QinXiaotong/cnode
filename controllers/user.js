// 导入文件
const userModel = require('../models/user');
// 导入md5 模块
const md5 = require('md5');

// 1. 展示登录页面
exports.showSignin = (req, res) => {
    res.render('signin.html');
}
// 2. 处理登录请求
exports.handleSignin = (req, res) => {
    // 验证邮箱是否存在
   userModel.getByEmail(req.body.email, (err, user) => {
       if (err) {
           return res.send('服务器内部错误');
       }

       if (!user) {
            return res.json({
                code: 401,
                msg: '邮箱不存在,请重新输入'
            })
       }
       // 验证密码

       const password = md5(req.body.password);
       if (password === user.password) {
           delete user.password;
           req.session.user = user;

           res.json({
               code: 200,
               msg: '登陆成功'
           });
       } else {
           res.json({
               code: 402,
               msg: '密码错误'
           });
       };
   });

}
// 3. 展示注册页面
exports.showSigup = (req, res) => {
    res.render('signup.html');
}
// 4. 处理注册请求
exports.handleSigup = (req, res) => {
    // 验证邮箱是否重复
    userModel.getByEmail(req.body.email, (err, user) => {
        if (err) {
            return res.send('服务器内部错误1');
        }

        if (user) {
            // user 是true的话是邮箱已经存在了
            return res.render('signup.html', {
                msg : '邮箱已经存在'
            })
        }
        // 验证昵称是否重复

        userModel.getByNickname(req.body.nickname, (err, user) => {
            if (err) {
                return res.send('服务器内部错误2');
            }

            if (user) {
                return res.render('signup.html',{
                    msg: '昵称已存在'
                })
            }

            console.log(req.body);
            // 转换数据
            req.body.createdAt = new Date();
            req.body.password = md5(req.body.password);
            // 插入数据库
            userModel.createUser(req.body, (err, isOK) => {
                if (isOK) {
                    res.redirect('/signin');
                } else {
                    res.render('signup.html', {
                        msg: '注册失败，可能是网络繁忙'
                    })
                }
            })

        })
    })
}
// 5. 退出
exports.handleSigout = (req, res) => {
    // 摧毁session
    req.session.destroy();
    // 跳转到登录页面
    res.redirect('/signin');
}




