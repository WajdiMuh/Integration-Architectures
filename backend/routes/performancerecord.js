const express = require('express');
const router = express.Router();
const {EvaluationRecord} = require('../classes/EvaluationRecord');
const mongowrapper = require('../mongowrapper');
router.use(express.json());

router.get('/readperformancerecords/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    mongowrapper.readperformancerecords(id,function(err,results){
        if(results){
            res.send(results);
        }else{
            res.status(404).send('cant find performance record with that id');
        }
    });
});

router.post('/createperformancerecord/:id',(req,res) =>{
    const id = parseInt(req.params.id);
    const record = EvaluationRecord.fromJson(req.body);
    mongowrapper.createperformancerecord(id,record,function(err,results){
        if(results){
            res.status(201).send('created successfully');
        }else{
            res.status(400).send('unable to create salesman');
        }
    });
});

router.delete('/deleteperformancerecord/:gid',(req,res) =>{
    const gid = parseInt(req.params.gid);
    mongowrapper.deleteperformancerecord(gid,function(err,results){
        if(results){
            res.status(200).send('deleted successfully');
        }else{
            res.status(400).send('unable to delete');
        }
    });
});

router.put('/updateperformancerecord',(req,res) =>{
    const record = EvaluationRecord.fromJson(req.body);
    mongowrapper.updateperformancerecord(record,function(err,results){
        if(results){
            res.status(200).send('updated successfully');
        }else{
            res.status(400).send('unable to update');
        }
    });
});

module.exports = router;