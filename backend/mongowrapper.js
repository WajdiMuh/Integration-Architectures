const {EvaluationRecord} = require('./classes/EvaluationRecord');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://127.0.0.1:27017";

function readperformancerecords(sid,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");

        performancerecordscollection.find({sid:sid}).toArray(function(err,results){
            db.close();
            if (err) throw err;
            if (results.length == 0){
                callback(err,null);
            }else{
                var records = [];
                results.forEach(record => {
                    records.push(EvaluationRecord.fromJson(record));
                });
                callback(null,records);
            }
        });
    });
}

function createperformancerecord(sid,record,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");

        performancerecordscollection.find({gid:record.gid}).toArray(function(err,results){
            if (err) throw err;
            if (results.length == 0){
                record.sid = sid;
                performancerecordscollection.insertOne(record.toJson()).then(() => {
                    db.close();
                    callback(null,record);
                }).catch((err) => {
                    db.close();
                    callback(err,null);
                });
            }else{
                db.close();
                callback(err,null);
            }
        });
    });
}

function deleteperformancerecord(gid,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");

        performancerecordscollection.find({gid:gid}).toArray(function(err,results){
            if (err) throw err;
            if (results.length == 0){
                db.close();
                callback(err,null);
            }else{
                performancerecordscollection.deleteOne({gid:gid}).then(() => {
                    db.close();
                    callback(null,gid);
                }).catch((err) => {
                    db.close();
                    callback(err,null);
                });
            }
        });
    });
}

function updateperformancerecord(record,callback){
    MongoClient.connect(url,function(err,db){
        if (err) throw err;
        const performancedb = db.db("Performance");
        const performancerecordscollection = performancedb.collection("performanceevals");

        performancerecordscollection.find({gid:record.gid}).toArray(function(err,results){
            if (err) throw err;
            if (results.length == 0){
                db.close();
                callback(err,null);
            }else{
                performancerecordscollection.findOneAndReplace({gid:record.gid},record.toJson()).then(() => {
                    db.close();
                    callback(null,record);
                }).catch((err) => {
                    db.close();
                    callback(err,null);
                });
            }
        });
    });
}

module.exports = {readperformancerecords,createperformancerecord,deleteperformancerecord,updateperformancerecord};