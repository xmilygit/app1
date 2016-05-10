var mongoose=require('mongoose');
var dbURI='mongodb://fjxx.vicp.net/mydb';
mongoose.connect(dbURI);

mongoose.connection.on('connected',function () {
    console.log('Mongoose数据库已连接到'+dbURI);
});

mongoose.connection.on('error',function (err) {
    console.log('Mongoose连接时发发生错误:'+err);
});

mongoose.connection.on('disconnected',function () {
    console.log('Mongoose已断开连接');
});

process.on('SIGINT',function () {
    mongoose.connection.close(function () {
        console.log('应用程序终止Mongoose已经断开连接');
        process.exit(0);
    });
});


/****************************
 * teacher Schema
 ****************************/
 var teacherSchema=new mongoose.Schema({
     tName:String,
     tSex:String,
     tMobile:String,
     tPassword:String
 });
 
 mongoose.model("Teacher",teacherSchema,"teachers");
 