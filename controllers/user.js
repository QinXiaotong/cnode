// 导入MySQL服务器js文件
const db = require('./db_helper');
// 导入md5 模块
const md5 = require('md5');

// 1. 展示登录页面
exports.showSignin = (req, res) => {
    res.render('signin.html');
}
// 2. 处理登录请求
exports.handleSignin = (req, res) => {
    // 验证用户输入
    db.query(
        'select * from `users` where email=?',
        req.body.email,
        (err,results) => {
            if (err) {
                return res.send('服务器内部错误');
            }

            if (results.length <= 0) {
                // 邮箱不存在
                return res.json({
                    code : 401,
                    msg : '邮箱不存在'
                });
            }
            console.log(results);
            const password = md5(req.body.password);
            if (password !== results[0].password) {
                // 密码错误
                return res.json({
                    code : 402,
                    msg : '密码错误'
                });
            }
            res.json({
                code : 200,
                msg : '登陆成功'
            })
        }
    )

}
// 3. 展示注册页面
exports.showSigup = (req, res) => {
    res.render('signup.html');
}
// 4. 处理注册请求
exports.handleSigup = (req, res) => {
    db.query(
        // 验证邮箱是否重复
        'select * from `users` where `email`=?',
        req.body.email,
        (err,results) => {
            if (err) {
                return res.send('服务器内部错误1');
            }

            if (results.length > 0) {
                res.render('signup.html', {
                    msg : '邮箱已存在'
                });
                return;
            }
            // 验证用户名是否重复
            db.query(
                'select * from `users` where `nickname`=?',
                req.body.nickname,
                (err,results) => {
                    if (err) {
                        return res.send('服务器内部错误2');
                    }

                    if (results.length > 0) {
                        res.render('signup.html',{
                            msg : '用户名已存在'
                        });
                        return;
                    }

                    // 插入数据
                    req.body.createdAt = new Date();
                    req.body.password = md5(req.body.password);
                    // 插入数据库
                    db.query(
                        'insert into `users` set ?',
                        req.body,
                        (err, results) => {
                            if (err) {
                                return res.send('服务器内部错误3');
                            }

                            if (results.affectedRows === 1) {
                                // 注册成功
                                res.render('signin.html');
                            }else {
                                res.render('signup.html',{
                                    msg : '注册失败'
                                })
                                return;
                            }
                        }
                    )
                }
            )
        }  
    )
}
// 5. 退出
exports.handleSigout = (req, res) => {

}




