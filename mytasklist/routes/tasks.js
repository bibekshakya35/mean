var express = require('express');
var router = express.Router();
var cors = require('cors');
//bring mongo js
var mongojs = require('mongojs');
//connect with database
var db = mongojs('mongodb://bibek:123@ds139480.mlab.com:39480/bibekshakya35_mytasklist',['tasks']);
router.use(cors());
router.options('*', cors());

//get all the tasks
router.get('/tasks',function(req,res,next){
    //call back function
    db.tasks.find(function(err,tasks){
        if(err){
            res.send(err);
        }
        res.json(tasks);
    });
});
//get single tasks
router.get("/task/:id",function(req,res,next){
    db.tasks.findOne({_id : mongojs.ObjectId(req.params.id)},function (err,task) {
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
//save task

router.post("/task",function(req,res,next){
    let task = req.body;
    if(!task.title||!(task.isDone+'')){
        res.status(400);
        res.json({
            "error":"Bad Data"
        });
    }
    else{
        db.tasks.save(task,function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });
    }
});
router.put("/task/:id",function(req,res,next){
    var task = req.body;
    var updatedTask = {};
    if(task.isDone){
        updatedTask.isDone=task.isDone;
    }
    if(task.title){
        updatedTask.title = task.title;
    }
    if(!updatedTask){
    res.status(400);
    res.json({
        "error":"Bad Data"
    });
    }
    else{
        db.tasks.update({_id : mongojs.ObjectId(req.params.id)},updatedTask,{},function(err,task){
            if(err){
                res.send(err);
            }
            res.json(task);
        });

    }
});
router.delete("/task/:id",function(req,res,next){
    db.tasks.remove({_id : mongojs.ObjectId(req.params.id)},function (err,task) {
        console.log("server side"+JSON.stringify(task));
        if(err){
            res.send(err);
        }
        res.json(task);
    });
});
module.exports = router;