class Product{
    constructor(productid,productnumber,name,quantity = 0){
        this.productid = productid;
        this.productnumber = productnumber;
        this.name = name;
        this.quantity = quantity;
    }
    static fromJson(json,quantity = 0) {
        return new Product(json['identity'].substring(json['identity'].lastIndexOf('/') + 1),json['productNumber'],json['name'],parseInt(quantity));
    }
    toJson() {
        return {productid:this.productid,productnumber:this.productnumber,name:this.name,quantity:this.quantity};
    }
}
module.exports = {Product};