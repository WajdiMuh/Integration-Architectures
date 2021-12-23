class Employee{
    constructor(name,orangehrmid,employeeid,jobtitle,department){
        this.name = name;
        this.orangehrmid = orangehrmid;
        this.employeeid = employeeid;
        this.jobtitle = jobtitle;
        this.department = department;
    }
    static fromJson(json) {
        return new Employee(json['fullName'],json['employeeId'],json['code'],json['jobTitle'],json['unit']);
    }
    toJson() {
        return {name:this.name,orangehrmid:this.orangehrmid,employeeid:this.employeeid,jobtitle:this.jobtitle,department:this.department};
    }
}
module.exports = {Employee};