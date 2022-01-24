class EvaluationRecord{
    constructor(id,competence,openness,socialbehaviour,attitude,communication,integrity,year){
        this.id = id;
        this.competence = competence;
        this.openness = openness;
        this.socialbehaviour = socialbehaviour;
        this.attitude = attitude;
        this.communication = communication;
        this.integrity = integrity;
        this.year = year;
    }
    static fromJson(json) {
        return new EvaluationRecord(json['id'],json['competence'],json['openness'],json['socialbehaviour'],json['attitude'],json['communication'],json['integrity'],json['year']);
    }
    static fromJsondata(id,year,json) {
        return new EvaluationRecord(id,json['competence'],json['openness'],json['socialbehaviour'],json['attitude'],json['communication'],json['integrity'],year);
    }
    toJson() {
        return {id:this.id,competence:this.competence,socialbehaviour:this.socialbehaviour,attitude:this.attitude,communication:this.communication,integrity:this.integrity,year:this.year};
    }
}
module.exports = {EvaluationRecord};