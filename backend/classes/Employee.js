class Employee{
    constructor(name,orangehrmid = "0",employeeid,jobtitle,department){
        this.name = name;
        this.orangehrmid = orangehrmid;
        this.employeeid = employeeid;
        this.jobtitle = jobtitle;
        this.department = department;
    }
    static fromorangeJson(json) {
        return new Employee(json['fullName'],json['employeeId'],json['code'],json['jobTitle'],json['unit']);
    }
    static fromopenJson(json) {
        return new Employee(json['firstName'] + ' ' + json['lastName'],undefined,json['governmentId'].toString(),json['jobTitle'],json['department']);
    }
    toJson() {
        return {name:this.name,orangehrmid:this.orangehrmid,employeeid:this.employeeid,jobtitle:this.jobtitle,department:this.department};
    }
}
module.exports = {Employee};