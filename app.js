const express = require('express');
const app = express();
// 导入处理模板模块
const artTemplate = require('express-art-template');
// 导入处理模板模块
const bodyParser = require('body-parser');
const router = require('./routes/router');


// 处理静态资源

app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置模板引擎
app.engine('html', artTemplate);
app.use(bodyParser.urlencoded({ extended: false }));


// 注册路由
app.use(router);




app.listen(3000, () => {
    console.log('监听中···');
})















// app.get('/',(req, res) => {
//     res.send('轻盈了');
// })