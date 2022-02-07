class Customer{
    constructor(name,customerid,rating){
        this.name = name;
        this.customerid = customerid;
        this.rating = rating;
    }
    static fromJson(json) {
        return new Customer(json['name'],json['identity'].substring(json['identity'].lastIndexOf('/') + 1),5 - json['accountRating']);
    }
    toJson() {
        return {name:this.name,customerid:this.customerid,rating:this.rating};
    }
}
module.exports = {Customer};