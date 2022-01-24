const express = require('express');
const router = express.Router();
const {EvaluationRecord} = require('../classes/EvaluationRecord');
const mongowrapper = require('../mongowrapper');
router.use(express.json());

router.get('/readperformancerecord/:id/:year',(req,res) =>{
    const id = parseInt(req.params.id);
    const year = parseInt(req.params.year);
    mongowrapper.readperformancerecord(id,year,function(result){
        if(result){
            res.send(result);
        }else{
            res.status(404).send('cant find performance record with that id or year');
        }
    });
});

router.post('/createperformancerecord/:id/:year',(req,res) =>{
    const id = parseInt(req.params.id);
    const year = parseInt(req.params.year);
    const record = EvaluationRecord.fromJsondata(id,year,req.body);
    mongowrapper.createperformancerecord(id,year,record,function(result){
        if(result){
            res.status(201).send('created successfully');
        }else{
            res.status(400).send('unable to create performance record');
        }
    });
});

router.delete('/deleteperformancerecord/:id/:year',(req,res) =>{
    const id = parseInt(req.params.id);
    const year = parseInt(req.params.year);
    mongowrapper.deleteperformancerecord(id,year,function(result){
        if(result){
            res.status(200).send('deleted successfully');
        }else{
            res.status(400).send('unable to delete');
        }
    });
});

router.put('/updateperformancerecord/:id/:year',(req,res) =>{
    const id = parseInt(req.params.id);
    const year = parseInt(req.params.year);
    const record = EvaluationRecord.fromJsondata(id,year,req.body);
    mongowrapper.updateperformancerecord(id,year,record,function(result){
        if(result){
            res.status(200).send('updated successfully');
        }else{
            res.status(400).send('unable to update');
        }
    });
});

module.exports = router;