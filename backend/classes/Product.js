class Product{
    constructor(productid,productnumber,name){
        this.productid = productid;
        this.productnumber = productnumber;
        this.name = name;
    }
    static fromJson(json) {
        return new Product(json['identity'].substring(json['identity'].lastIndexOf('/') + 1),json['productNumber'],json['name']);
    }
    toJson() {
        return {productid:this.productid,productnumber:this.productnumber,name:this.name};
    }
}
module.exports = {Product};