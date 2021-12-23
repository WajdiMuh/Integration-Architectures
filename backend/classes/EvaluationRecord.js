class EvaluationRecord{
    constructor(sid,gid,gdesc,targetval,actualval,year){
        this.sid = sid;
        this.gid = gid;
        this.gdesc = gdesc;
        this.targetval = targetval;
        this.actualval = actualval;
        this.year = year;
    }
    static fromJson(json) {
        return new EvaluationRecord(json['sid'],json['gid'],json['gdesc'],json['targetval'],json['actualval'],json['year']);
    }
    toJson() {
        return {sid:this.sid,gid:this.gid,gdesc:this.gdesc,targetval:this.targetval,actualval:this.actualval,year:this.year};
    }
}
module.exports = {EvaluationRecord};