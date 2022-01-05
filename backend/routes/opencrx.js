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

    let products = [];

    let productsrequest = await legacysystemhandler.executeopencrxcall(salesorderjson['@href'] + "/position");

    if(productsrequest.data.objects){
        let productspromises = productsrequest.data.objects.map((product) => legacysystemhandler.executeopencrxcall(product['product']['@href']));

        await Promise.all(productspromises).then((product) => {
            products = product.map((p,i) => Product.fromJson(p.data,productsrequest.data.objects[i]["quantity"]));
        });
    }
    return new Promise((resolve, reject) => {
          resolve(SalesOrder.fromJson(salesorderjson,customer,employee,products));
    })
}

router.get('/readallsales',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder').then(async function(result) 
        {
            let salesorderspromises = result.data.objects.map((salesorder) => fetchsalesorderdata(salesorder));

            await Promise.all(salesorderspromises).then((salesorders) => {
                res.send(salesorders);
            });
        }
    );
});

router.get('/readsale/:id',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder/' + req.params.id).then(async function(result) 
        {
            let salesorder = await fetchsalesorderdata(result.data);
            res.send(salesorder);
        }
    ).catch(function(err) 
        {
            res.status(404).send("order not found");
        }
    );
});

router.get('/readsalesbyemployee/:id',(req,res) =>{
    legacysystemhandler.executeopencrxcall('https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder?query=thereExistsSalesRep().governmentId().equalTo(:integer:' + req.params.id +')').then(async function(result) 
        {
            let salesorderspromises = result.data.objects.map((salesorder) => fetchsalesorderdata(salesorder));

            await Promise.all(salesorderspromises).then((salesorders) => {
                res.send(salesorders);
            });
        }
    ).catch(function(err) 
        {
            res.status(404).send("no orders from this salesmen");
        }
    );
});

module.exports = router;