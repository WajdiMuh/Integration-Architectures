const opencrx = require('../routes/opencrx');
const sinon = require("sinon");
const expect = require('chai').expect;
const { Customer } = require('../classes/Customer');
const { Product } = require('../classes/Product');
const { SalesOrder } = require('../classes/SalesOrder');
const { Employee } = require('../classes/Employee');
describe("opencrx",() => {
    describe("isnotstubbed",function() {
        it("read all customers",async function() {

            let res = {
                send: sinon.spy()
            }

            await opencrx.readallcustomers(undefined,res);

            let expectedreturn = [
                new Customer('Telekom AG','97NB4O91UQORTH2MA4T2TYJFL',4),
                new Customer('Germania GmbH','9DXSJ5D62FBHLH2MA4T2TYJFL',2),
                new Customer('Dirk Müller GmbH','9DXSJ6MJS0KX5H2MA4T2TYJFL',2),
                new Customer('Mayer Werft AG','9K9OSN1V4YY95H2MA4T2TYJFL',3)
            ];

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read customer",async function() {

            let req = {
                params: { id: '97NB4O91UQORTH2MA4T2TYJFL' }
            }

            let res = {
                send: sinon.spy()
            }

            await opencrx.readcustomer(req,res);

            let expectedreturn = new Customer('Telekom AG','97NB4O91UQORTH2MA4T2TYJFL',4);

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read all products",async function() {

            let res = {
                send: sinon.spy()
            }

            await opencrx.readallproducts(undefined,res);

            let expectedreturn = [
                new Product('9JMBMVTX2CSMHH2MA4T2TYJFL',1002,'HooverClean',0),
                new Product('L6K68IE1QROBTH2MA4T2TYJFL',1001,'HooverGo',0)
            ];
            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read product",async function() {

            let req = {
                params: { id: '9JMBMVTX2CSMHH2MA4T2TYJFL' }
            }

            let res = {
                send: sinon.spy()
            }

            await opencrx.readproduct(req,res);

            let expectedreturn = new Product('9JMBMVTX2CSMHH2MA4T2TYJFL',1002,'HooverClean',0);

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read all sales",async function() {

            let res = {
                send: sinon.spy()
            }

            await opencrx.readallsales(undefined,res);

            let expectedreturn = [
                new SalesOrder("9DTSXR06DLHPM0EBHQA5MAZ7J","Telekom_Sallinger_2019","07/01/2020","5500.000000000","467.500000000","5967.500000000",new Customer("Telekom AG","97NB4O91UQORTH2MA4T2TYJFL",4),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",10),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",15)]),
                new SalesOrder("9DXSKIH1RCHD5H2MA4T2TYJFL","German1","26/05/2019","2500.000000000","212.500000000","2712.500000000",new Customer("Germania GmbH","9DXSJ5D62FBHLH2MA4T2TYJFL",2),new Employee("John Smith","0","90123","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",10)]),
                new SalesOrder("9DXSKMWV9GXD5H2MA4T2TYJFL","Dirk1","26/05/2019","5625.000000000","478.125000000","6103.125000000",new Customer("Dirk Müller GmbH","9DXSJ6MJS0KX5H2MA4T2TYJFL",2),new Employee("John Smith","0","90123","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",25)]),
                new SalesOrder("9ENGNFGDLDQSPH2MA4T2TYJFL","Telekom2","26/05/2019","4000.000000000","340.000000000","4340.000000000",new Customer("Telekom AG","97NB4O91UQORTH2MA4T2TYJFL",4),new Employee("John Smith","0","90123","Senior Salesman","Sales"),[new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",20)]),
                new SalesOrder("9NWI6UYX6YGH87IGMO3WKDQ7W","Sausage Test 2","12/02/2022","5570.000000000","473.450000000","6043.450000000",new Customer("Germania GmbH","9DXSJ5D62FBHLH2MA4T2TYJFL",2),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",30),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",44)]),
                new SalesOrder("9NWIA1QJWTCRW7IGMO3WKDQ7W","Urgent Sausage Order","13/02/2022","3740.000000000","317.900000000","4057.900000000",new Customer("Dirk Müller GmbH","9DXSJ6MJS0KX5H2MA4T2TYJFL",2),new Employee("John Smith","0","90123","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",66),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",22)]),
                new SalesOrder("L6K69EO6Y3ZS9H2MA4T2TYJFL","Mayer1","26/05/2019","2200.000000000","187.000000000","2387.000000000",new Customer("Mayer Werft AG","9K9OSN1V4YY95H2MA4T2TYJFL",3),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",10)]),
                new SalesOrder("RPI8KYL4J2GA47IGMO3WKDQ7W","ContractTest2","09/02/2022","0.000000000","0.000000000","0.000000000",new Customer("Dirk Müller GmbH","9DXSJ6MJS0KX5H2MA4T2TYJFL",2),new Employee("Max Mustermann","0","0000","Sales",undefined),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",20),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",120)]),
                new SalesOrder("RPI8V9YPYA8Z07IGMO3WKDQ7W","Sausage Order","13/02/2022","8625.000000000","733.125000000","9358.125000000",new Customer("Germania GmbH","9DXSJ5D62FBHLH2MA4T2TYJFL",2),new Employee("John Smith","0","90123","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",15),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",105)])
            ];
            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read sale",async function() {

            let req = {
                params: { id: '9DTSXR06DLHPM0EBHQA5MAZ7J' }
            }

            let res = {
                send: sinon.spy()
            }

            await opencrx.readsale(req,res);

            let expectedreturn = new SalesOrder("9DTSXR06DLHPM0EBHQA5MAZ7J","Telekom_Sallinger_2019","07/01/2020","5500.000000000","467.500000000","5967.500000000",new Customer("Telekom AG","97NB4O91UQORTH2MA4T2TYJFL",4),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",10),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",15)]);

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read sales by employee",async function() {

            let req = {
                params: { id: '90124' }
            }

            let res = {
                send: sinon.spy()
            }

            await opencrx.readsalesbyemployee(req,res);

            let expectedreturn = [
                new SalesOrder("9DTSXR06DLHPM0EBHQA5MAZ7J","Telekom_Sallinger_2019","07/01/2020","5500.000000000","467.500000000","5967.500000000",new Customer("Telekom AG","97NB4O91UQORTH2MA4T2TYJFL",4),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",10),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",15)]),
                new SalesOrder("9NWI6UYX6YGH87IGMO3WKDQ7W","Sausage Test 2","12/02/2022","5570.000000000","473.450000000","6043.450000000",new Customer("Germania GmbH","9DXSJ5D62FBHLH2MA4T2TYJFL",2),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",30),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",44)]),
                new SalesOrder("L6K69EO6Y3ZS9H2MA4T2TYJFL","Mayer1","26/05/2019","2200.000000000","187.000000000","2387.000000000",new Customer("Mayer Werft AG","9K9OSN1V4YY95H2MA4T2TYJFL",3),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",10)])
            ]

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
        it("read sales by employee in year",async function() {

            let req = {
                params: { 
                    id: '90124',
                    year : '2022'
                }
            }

            let res = {
                send: sinon.spy()
            }

            await opencrx.readsalesbyemployeeinyear(req,res);

            let expectedreturn = [
                new SalesOrder("9NWI6UYX6YGH87IGMO3WKDQ7W","Sausage Test 2","12/02/2022","5570.000000000","473.450000000","6043.450000000",new Customer("Germania GmbH","9DXSJ5D62FBHLH2MA4T2TYJFL",2),new Employee("Mary-Ann Sallinger","0","90124","Senior Salesman","Sales"),[new Product("9JMBMVTX2CSMHH2MA4T2TYJFL",1002,"HooverClean",30),new Product("L6K68IE1QROBTH2MA4T2TYJFL",1001,"HooverGo",44)]),
            ]

            expect(res.send.calledOnce).to.be.true;
            expect(res.send.firstCall.args[0]).to.deep.equal(expectedreturn);
        });
    });       
});
