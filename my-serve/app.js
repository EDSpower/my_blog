let path = require('path');
let express = require('express');
let serve = express();
var bodyParser = require('body-parser');
serve.use(bodyParser.json());
serve.use(bodyParser.urlencoded({ extended: true }));
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'blog'
});

connection.connect();

serve.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Content-Type', 'application/json;charset=utf-8');
    next();
});

serve.get('/pank/postslist', (req, res) => {
    connection.query('select * from postslist', function(error, result, fields) {
        if (error) throw error;

        res.send(result)
    });

});
serve.post('/insert', (req, res) => {
    let timeObj = new Date();
    let title = req.body.title;
    let content = req.body.content + '';
    console.log(content);

    let region = req.body.region;
    let time = timeObj.toLocaleDateString();
    connection.query(`insert into postslist(title,content,class,time) values('${title}',?,'${region}','${time}')`, content, function(error, result, fields) {
        if (error) throw error;
        console.log('新增成功！');
        res.send({ flag: true })

    });

});
serve.get('/select', (req, res) => {
    console.log(req.query);
    let id = req.query.id
    connection.query(`select * from postslist where Id=${id}`, function(error, result, fields) {
        if (error) throw error;
        res.send(result)

    });

});




serve.listen('3000', () => {
    console.log('3000端口服务器开启');

})