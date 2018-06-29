const express = require('express');
const app = express();
// 导入处理模板模块
const artTemplate = require('express-art-template');
// 导入处理模板模块
const bodyParser = require('body-parser');
const router = require('./routes/router');
// 引入session模块
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const config = require('./config');



// 处理静态资源

app.use('/public', express.static('./public'));
app.use('/node_modules', express.static('./node_modules'));
// 配置模板引擎
app.engine('html', artTemplate);
app.use(bodyParser.urlencoded({ extended: false }));


var db = config.database;
// 把session保存到mysql中
var options = {
  host: db.host,
  port: db.port,
  user: db.user,
  password: db.password,
  database: db.database
};

var sessionStore = new MySQLStore(options);
// 配置session
app.use(session({
  key: 'sessionid',  // 修改sessionid的名称
  secret: 'keyboard cat',  // 对sessionid 进行加密 
  resave: false,   // 强制重新存储服务器上的session数据  
  store: sessionStore,   // 配置把session数据存储到mysql
  saveUninitialized: true  // 即使不写session 也会生成sessionid
}));


// 注册路由
app.use(router);




app.listen(config.port, () => {
    console.log('监听' + config.port);
})















// app.get('/',(req, res) => {
//     res.send('轻盈了');
// })