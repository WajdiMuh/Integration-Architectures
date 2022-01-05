const express = require('express');
const router = express.Router();
const legacysystemhandler = require('../legacysystemhandler');
const {Product} = require('../classes/Product');
const {Customer} = require('../classes/Customer');
const {SalesOrder} = require('../classes//SalesOrder');
const { Employee } = require('../classes/Employee');
router.use(express.json());

router.get('/readallcustomers',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account?queryType=org:opencrx:kernel:account1:LegalEntity').then(function(result) 
        {
            let customers = [];
            result.data.objects.forEach(cus => {
                customers.push(Customer.fromJson(cus));
            });
            res.send(customers);
        }
    );
});

router.get('/readcustomer/:id',(req,res) => {
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account/' + req.params.id).then(function(result) 
        {
            res.send(Customer.fromJson(result.data));
        }
    ).catch(function() 
        {
            res.status(404).send("customer not found");
        }
    );
});

router.get('/readallproducts',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product').then(function(result) 
        {
            let products = [];
            result.data.objects.forEach(prod => {
                products.push(Product.fromJson(prod));
            });
            res.send(products);
        }
    );
});

router.get('/readproduct/:id',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product/' + req.params.id).then(function(result) 
        {
            res.send(Product.fromJson(result.data));
        }
    ).catch(function() 
        {
            res.status(404).send("product not found");
        }
    );
});
async function fetchsalesorderdata(salesorderjson){
    let customerrequest = await legacysystemhandler.executeopencrxcall(salesorderjson['customer']['@href']);
    let customer = Customer.fromJson(customerrequest.data);

    let employeerequest = await legacysystemhandler.executeopencrxcall(salesorderjson['salesRep']['@href']);
    let employee = Employee.fromopenJson(employeerequest.data);

    let productsrequest = await legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/' + req.params.id + "/position");

    let productspromises = productsrequest.data.objects.map((product) => legacysystemhandler.executeopencrxcall(product['product']['@href']));
    let products = [];

    await Promise.all(productspromises).then((product) => {
        products = product.map((p,i) => Product.fromJson(p.data,productsrequest.data.objects[i]["quantity"]));
    });

    return SalesOrder.fromJson(salesorderjson,customer,employee,products);
}

router.get('/readallsales',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder').then(function(result) 
        {

        }
    );
});

router.get('/readsale/:id',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/' + req.params.id).then(async function(result) 
        {
            console.log(result.data);
            let salesorder = await fetchsalesorderdata(result.data);
            res.send(salesorder);
        }
    ).catch(function(err) 
        {
            console.log(err);
            res.status(404).send("order not found");
        }
    );
});

module.exports = router;