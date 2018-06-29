const topicModel = require('../models/topic');
const moment = require('moment');
exports.showIndex = (req, res) => {
    topicModel.getAll((err, topics) => {
        if (err) {
          return res.send('服务器内部错误');
        }
        res.render('index.html', {
          user: req.session.user,
          topics,
          moment
        });
      });
}