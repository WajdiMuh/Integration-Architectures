class SalesOrder{
    constructor(salesorderid,name,date,totalamount,tax,totalamountwithtaxç,customer = null,employee = null,products = null){
        this.salesorderid = salesorderid;
        this.name = name;
        this.date = date;
        this.totalamount = totalamount;
        this.tax = tax;
        this.totalamountwithtax = totalamountwithtax;
        this.customer = customer;
        this.employee = employee;
        this.products = products;
    }
    static fromJson(json,customer,employee,products) {
        return new SalesOrder(json['identity'].substring(json['identity'].lastIndexOf('/') + 1),json['name'],json['createdAt'],json['totalAmount'],json['totalTaxAmount'],json['totalAmountIncludingTax'],customer,employee,products);
    }
    toJson() {
        return {salesorderid:this.salesorderid,name:this.name,date:this.date,totalamount:this.totalamount,tax:this.tax,totalamountwithtax:this.totalamountwithtax,customer:this.customer,employee:this.employee,products:this.products};
    }
}
module.exports = {SalesOrder};