const mongowrapper = require('../mongowrapper');
const sinon = require("sinon");
const expect = require('chai').expect;
const { EvaluationRecord } = require('../classes/EvaluationRecord');
describe("mongowrapper",() => {
    describe("isstubbed",function() {
        before(()=>{
            this.readperformancerecord = sinon.stub(mongowrapper,'readperformancerecord').callsFake(function(id,year,callback) {
                if(id == 98765 && year == 9999){
                    callback(new EvaluationRecord(98765,{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 5 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 4 },{ targetval: 4, actualval: 4 },9999));
                }else{
                    callback(null);
                }
            });

            this.createperformancerecord = sinon.stub(mongowrapper,'createperformancerecord').callsFake(function(id,year,record,callback) {
                callback(record);
            });

            this.updateperformancerecord = sinon.stub(mongowrapper,'updateperformancerecord').callsFake(function(id,year,record,callback) {
                callback(record);
            });

            this.deleteperformancerecord = sinon.stub(mongowrapper,'deleteperformancerecord').callsFake(function(id,year,callback) {
                callback("deleted");
            });

            this.addbonusremark = sinon.stub(mongowrapper,'addbonusremark').callsFake(function(id,year,remark,callback) {
                callback(remark);
            });

        });

        after(()=>{
            mongowrapper.readperformancerecord.restore();
            mongowrapper.createperformancerecord.restore();
            mongowrapper.updateperformancerecord.restore();
            mongowrapper.deleteperformancerecord.restore();
            mongowrapper.addbonusremark.restore();
        });

        it("create performance record", function(done) {
            let createdperformancerecord = new EvaluationRecord(98765,{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 5 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 4 },{ targetval: 4, actualval: 4 },9999);
            mongowrapper.createperformancerecord(98765,9999,createdperformancerecord,function(result){
                if(result){
                    done();
                }else{
                    done("not created");
                }
            });
        });
        it("read performance record", function(done) {
            mongowrapper.readperformancerecord(98765,9999,function(result){
                if(result){
                    let expectedreturn = new EvaluationRecord(98765,{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 5 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 4 },{ targetval: 4, actualval: 4 },9999);
                    expect(result).to.deep.equal(expectedreturn);
                    done();
                }else{
                    done("no result back");
                }
            });
        });
        it("update performance record", function(done) {
            let updatedperformancerecord = new EvaluationRecord(98765,{ targetval: 4, actualval: 2 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 5 },{ targetval: 4, actualval: 3 },{ targetval: 4, actualval: 4 },{ targetval: 4, actualval: 4 },9999);
            mongowrapper.updateperformancerecord(98765,9999,updatedperformancerecord,function(result){
                if(result){
                    done();
                }else{
                    done("not updated");
                }
            });
        });
        it("delete performance record", function(done) {
            mongowrapper.deleteperformancerecord(98765,9999,function(result){
                if(result){
                    done();
                }else{
                    done("not deleted");
                }
            });
        });
        it("add bonus remark", function(done) {
            mongowrapper.addbonusremark(98765,9999,"remark test",function(result){
                if(result){
                    done();
                }else{
                    done("error or already exists");
                }
            });
        });
    });
});
