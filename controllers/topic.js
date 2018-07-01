const categoryModel = require('../models/category');
const topicModel = require('../models/topic');

// 显示添加话题的页面
exports.showCreate = (req, res) => {
    categoryModel.getAll((err, categorise) => {
        res.render('topic/create.html',{
            categorise,
            user: req.session.user
        });
    });
};

//  处理添加话题  -- 接口
exports.handleCreate = (req, res) => {
    // 判断session中是否有数据
  if (!req.session.user) {
    res.json({
      code: 403,
      msg: '登录过期，请先登录'
    });
  }
  // TODO   验证用户输入
  req.body.userId = req.session.user.id;
  req.body.createdAt = new Date();
  topicModel.createTopic(req.body, (err, isOK) => {
    if (err) {
      return res.json({
        code: 500,
        msg: '服务器内部错误'
      });
    }
    if (isOK) {
      res.json({
        code: 200,
        msg: '添加话题成功'
      });
    } else {
      res.json({
        code: 400,
        msg: '话题添加失败'
      });
    }
  });
}

// 显示话题详情页
exports.showTopic = (req, res) => {
    //res.send('showTopic');
    //res.render('topic/show.html');
  const topicID = req.params.topicID;
  //console.log(topicID);
  if (isNaN(topicID)) {
    return res.send('参数错误');
  }
  topicModel.getById(topicID, (err,topic) => {
    if (err) {
      res.send('服务器内部错误');
    }
    if (topic) {
      res.render('topic/show.html',{
        topic,
        user: req.session.user
      });
    } else {
      res.send('您访问的话题不存在');
    }
  })
}

// 显示话题编辑页
exports.showEdit = (req, res) => {
    //res.send('showEdit');
    categoryModel.getAll((err,categories) => {

     const id = req.params.topicID; 

      if (isNaN(id)) {
        return res.send('参数错误');
      }
      topicModel.getById(id,(err, topic) => {
        if (err) {
         return res.send('服务器内部错误');
        }
        if (topic) {
          res.render('topic/edit.html',{
            categories,
            topic,
            user: req.session.user
          });
        } else {
          res.send('没有查询到数据');
        }
      })
    })

}

// 处理编辑话题
exports.handleEdit = (req, res) => {
    //res.send('handleEdit');
    const id = req.params.topicID;
    // TODO 判断是否是数字
    // 获取请求过来的数据
    // req.body
    req.body.id = id;
    // TODO 数据验证
    topicModel.update(req.body, (err, isOK) => {
      if (err) {
        return res.json({
          code: 500,
          msg: '服务器内部错误'
        });
      }
      if (isOK) {
        res.json({
          code: 200,
          msg: '修改成功'
        });
      } else {
        res.json({
          code: 403,
          msg: '修改失败'
        });
      }
    });
}

// 处理删除话题哦
exports.handleDelete = (req, res) => {
    //res.send('handleDelete');
    const id = req.params.topicID;
    topicModel.delete(id,(err, isOK) => {
      if (err) {
        res.send('服务器内部错误');
      }
      if (isOK) {
        res.redirect('/');
      } else {
        res.send('删除失败');
      }
    })
}