const db = require('./db_helper');

// 增加用户

exports.createUser = (user, callback) => {
    db.query(
        'insert into `users` set?',
        user,
        (err,results) => {
            if (err) {
                return callback(err);
            }

            if (results.affectedRows > 0) {
                callback(null, true);
            } else {
                callback(null, false);
            }
        }
    );
};

// 根据email查询用户
exports.getByEmail = (email, callback) => {
    db.query(
        'select * from `users` where `email`=?',
        email,
        (err, results) => {
            if (err) {
                return callback(err);
            }

            if (results.length > 0) {
                //email 在数据库中是唯一的 只有两种可能有一个或者没有
                callback(null, results[0]);
            } else {
                callback(null, null);
            }
        }
    );
};

// 根据nickname查询用户

exports.getByNickname = (nickname, callback) => {
    db.query(
        'select * from `users` where `nickname`=?',
        nickname,
        (err, results) => {
            if (err) {
                return callback(err);
            }

            if (results.length > 0) {
                callback(null, results[0]);
            } else {
                callback(null, null);
            }
        }
    );
};