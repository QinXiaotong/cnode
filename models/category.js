const db = require('./db_helper');

exports.getAll = (callback) => {
    db.query(
        'select * from `topic_categories`',
        (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, results);
        }
    )
}