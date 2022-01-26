const {EvaluationRecord} = require('./classes/EvaluationRecord');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";

function readperformancerecord(id,year,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");
        performancerecordscollection.findOne({id:id,year:year}).then((record) => {
            db.close();
            if(record){
                callback(EvaluationRecord.fromJson(record));
            }else{
                callback(null);
            }
        });
    });
}

function createperformancerecord(id,year,recorddata,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");
        performancerecordscollection.findOne({id:id,year:year}).then((record) => {
            if(record){
                db.close();
                callback(null);
            }else{
                performancerecordscollection.insertOne(recorddata.toJson()).then(() => {
                    db.close();
                    callback(recorddata);
                }).catch((err) => {
                    db.close();
                    callback(null);
                });
            }
        });
    });
}

function deleteperformancerecord(id,year,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");
        performancerecordscollection.findOne({id:id,year:year}).then((record) => {
            if(record){
                performancerecordscollection.deleteOne({id:id,year:year}).then(() => {
                    db.close();
                    callback(record);
                }).catch((err) => {
                    db.close();
                    callback(null);
                });
            }else{
                db.close();
                callback(null);
            }
        });
    });
}

function updateperformancerecord(id,year,recorddata,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");
        performancerecordscollection.findOne({id:id,year:year}).then((record) => {
            if(record){
                performancerecordscollection.findOneAndReplace({id:id,year:year},recorddata.toJson()).then(() => {
                    db.close();
                    callback(recorddata);
                }).catch((err) => {
                    db.close();
                    callback(null);
                });
            }else{
                db.close();
                callback(null);
            }
        });
    });
}

function addbonusremark(id,year,remark,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const bonusremarkscollection = performancedb.collection("bonusremarks");
        bonusremarkscollection.findOne({id:id,year:year}).then((bonusremark) => {
            if(bonusremark){
                db.close();
                callback(null);
            }else{
                bonusremarkscollection.insertOne({id:id,year:year,remark:remark}).then(() => {
                    db.close();
                    callback({id:id,year:year,remark:remark});
                }).catch((err) => {
                    db.close();
                    callback(null);
                });
            }
        });
    });
}

module.exports = {readperformancerecord,createperformancerecord,deleteperformancerecord,updateperformancerecord,addbonusremark};